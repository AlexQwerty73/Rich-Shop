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
  const { data: richPeople = [] } = useGetRichHumansQuery(personId);
  const { data: products = [], isLoading } = useGetProductsQuery();

  const [searchQuery, setSearchQuery] = useState('');
  const [purchases, setPurchases] = useState({});
  const [quantities, setQuantities] = useState({});
  const [isPurchasesOpen, setIsPurchasesOpen] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const richPerson = richPeople[0] || {};
  const initialWealth = Number(richPerson.wealth) || 0;
  const ITEMS_PER_PAGE = 9;
  const currentPage = Number(page);

  // Расчет баланса с защитой от отрицательных значений
  const totalSpent = Object.values(purchases).reduce(
    (sum, { quantity, price }) => sum + (Number(quantity) * Number(price)),
    0
  );
  const currentBalance = Math.max(initialWealth - totalSpent, 0);

  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [currentBalance]);

  // расчет максимального количества
  const getMaxQuantity = (price) => {
    const numericPrice = Number(price);
    return numericPrice > 0 ? Math.floor(currentBalance / numericPrice) : 0;
  };

  const handleQuantityChange = (productId, newQuantity, price) => {
    const numericPrice = Number(price);
    const maxQuantity = getMaxQuantity(numericPrice);
    
    let quantity = Math.max(Number(newQuantity), 0);
    quantity = Math.min(quantity, maxQuantity);

    console.log( numericPrice, maxQuantity, quantity);
    // Принудительная коррекция при превышении
    if (quantity > maxQuantity) {
      quantity = maxQuantity;
    }

    setQuantities(prev => ({ 
      ...prev, 
      [productId]: quantity 
    }));
    console.log(quantities);
    

    setPurchases(prev => {
      const updated = { ...prev };
      if (quantity > 0) {
        updated[productId] = {
          quantity,
          price: numericPrice,
          name: products.find(p => p.id === productId)?.name || ''
        };
      } else {
        delete updated[productId];
      }
      return updated;
    });
  };

  const handleRemove = (productId) => {
    handleQuantityChange(productId, 0, purchases[productId].price);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    navigate(`/spend/${personId}/${newPage}`);
  };

  return (
    <div className={s.wrapper}>
      <Container>
        <div className={s.header}>
          <BackButton />
        </div>
      </Container>

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
              const productPrice = Number(product.price);
              const currentQuantity = quantities[product.id] || 0;
              const maxQuantity = getMaxQuantity(productPrice);

              return (
                <div key={product.id} className={s.productCard}>
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
                          product.id, 
                          currentQuantity - 1, 
                          productPrice
                        )}
                        disabled={currentQuantity <= 0}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="0"
                        max={maxQuantity}
                        value={currentQuantity}
                        onChange={(e) => {
                          const value = Math.floor(Number(e.target.value));
                          handleQuantityChange(
                            product.id,
                            !isNaN(value) ? value : 0,
                            productPrice
                          );
                        }}
                        className={s.quantityInput}
                      />
                      <button
                        className={s.quantityButton}
                        onClick={() => handleQuantityChange(
                          product.id, 
                          currentQuantity + 1, 
                          productPrice
                        )}
                        disabled={currentQuantity >= maxQuantity}
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