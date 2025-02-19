import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetProductsQuery, useGetRichHumansQuery } from '../../redux';
import { Container, BackButton, Pagination } from '../../components';
import s from './PageStore.module.css';

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
};

export const PageStore = () => {
  const { personId, page = 1 } = useParams();
  const navigate = useNavigate();
  
  // Получаем данные из API
  const { data: richPeople = [] } = useGetRichHumansQuery(personId);
  const { data: products = [], isLoading } = useGetProductsQuery();

  // Состояния компонента
  const [searchQuery, setSearchQuery] = useState('');
  const [purchases, setPurchases] = useState({});
  const [isPurchasesOpen, setIsPurchasesOpen] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  // Данные о выбранном человеке
  const richPerson = richPeople[0] || {};
  const initialWealth = Number(richPerson.wealth) || 0;

  // Конфигурация пагинации
  const ITEMS_PER_PAGE = 9;
  const currentPage = Number(page);

  /* 
    Расчет текущего баланса:
    - Суммируем все текущие покупки
    - Вычитаем из начального капитала
    - Гарантируем неотрицательное значение
  */
  const totalSpent = Object.values(purchases).reduce(
    (sum, { quantity, price }) => sum + (quantity * price),
    0
  );
  const currentBalance = Math.max(initialWealth - totalSpent, 0);

  // Анимация при изменении баланса
  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [currentBalance]);

  /* 
    Расчет максимального количества для товара:
    1. Рассчитываем доступный баланс БЕЗ текущего товара
    2. Добавляем обратно стоимость уже выбранного количества
    3. Делим на цену товара
  */
  const getMaxQuantity = (productId, productPrice) => {
    const currentQty = purchases[productId]?.quantity || 0;
    const price = Number(productPrice);
    
    if (price <= 0) return 0;
    
    // Доступные средства с учетом уже выбранного количества
    const availableBalance = currentBalance + (currentQty * price);
    return Math.floor(availableBalance / price);
  };

  // Обработчик изменения количества
  const handleQuantityChange = (productId, newQuantity, productPrice) => {
    const price = Number(productPrice);
    const maxQty = getMaxQuantity(productId, price);
    
    // Корректируем введенное значение
    let quantity = Math.max(0, Math.min(
      Number(newQuantity),
      maxQty
    ));

    // Обновляем состояние покупок
    setPurchases(prev => {
      const updated = { ...prev };
      
      if (quantity > 0) {
        updated[productId] = {
          quantity,
          price,
          name: products.find(p => p.id === productId)?.name || ''
        };
      } else {
        delete updated[productId];
      }
      
      return updated;
    });
  };

  // Обработчик удаления товара
  const handleRemove = (productId) => {
    handleQuantityChange(productId, 0, 0);
  };

  // Фильтрация и пагинация товаров
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Смена страницы
  const handlePageChange = (newPage) => {
    navigate(`/spend/${personId}/${newPage}`);
  };

  return (
    <div className={s.wrapper}>
      {/* Шапка с кнопкой возврата */}
      <Container>
        <div className={s.header}>
          <BackButton />
        </div>
      </Container>

      {/* Верхняя панель с балансом и покупками */}
      <div className={s.topPanel}>
        <Container>
          <div className={s.balanceContainer}>
            <span className={s.balanceLabel}>Remaining Wealth:</span>
            <span key={animationKey} className={s.balance}>
              {formatCurrency(currentBalance)}
            </span>
          </div>

          <div className={s.purchasesSection}>
            <button
              className={s.purchasesToggle}
              onClick={() => setIsPurchasesOpen(!isPurchasesOpen)}
            >
              {isPurchasesOpen ? 'Hide' : 'Show'} Purchases ({Object.keys(purchases).length})
            </button>

            {isPurchasesOpen && (
              <div className={s.purchasesList}>
                {Object.entries(purchases)
                  .filter(([_, item]) => item.quantity > 0)
                  .map(([id, item]) => (
                    <div key={id} className={s.purchaseItem}>
                      <div className={s.purchaseInfo}>
                        {item.name} × {item.quantity}
                        <span className={s.purchaseTotal}>
                          ({formatCurrency(item.quantity * item.price)})
                        </span>
                      </div>
                      <button
                        className={s.removeButton}
                        onClick={() => handleRemove(id)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </Container>
      </div>

      {/* Основной контент */}
      <Container>
        <div className={s.searchContainer}>
          <input
            type="text"
            placeholder="Search products..."
            className={s.searchInput}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handlePageChange(1);
            }}
          />
        </div>

        <div className={s.productsGrid}>
          {isLoading ? (
            <div className={s.loading}>Loading products...</div>
          ) : paginatedProducts.length > 0 ? (
            paginatedProducts.map(product => {
              const productId = product.id;
              const productPrice = Number(product.price);
              const currentQty = purchases[productId]?.quantity || 0;
              const maxQty = getMaxQuantity(productId, productPrice);

              return (
                <div key={productId} className={s.productCard}>
                  <h3 className={s.productName}>{product.name}</h3>
                  <p className={s.productDescription}>{product.description}</p>
                  <div className={s.productFooter}>
                    <span className={s.productPrice}>
                      {formatCurrency(productPrice)}
                    </span>
                    <div className={s.quantityControls}>
                      <button
                        className={s.quantityButton}
                        onClick={() => handleQuantityChange(
                          productId, 
                          currentQty - 1, 
                          productPrice
                        )}
                        disabled={currentQty <= 0}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={currentQty}
                        min="0"
                        max={maxQty}
                        onChange={(e) => {
                          const value = Math.max(0, parseInt(e.target.value) || 0);
                          handleQuantityChange(productId, value, productPrice);
                        }}
                        className={s.quantityInput}
                      />
                      <button
                        className={s.quantityButton}
                        onClick={() => handleQuantityChange(
                          productId, 
                          currentQty + 1, 
                          productPrice
                        )}
                        disabled={currentQty >= maxQty}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className={s.noResults}>No products found</div>
          )}
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </Container>
    </div>
  );
};  