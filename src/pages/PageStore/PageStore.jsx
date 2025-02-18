import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetProductsQuery, useGetRichHumansQuery } from '../../redux';
import { Container, BackButton, Pagination } from '../../components';
import s from './PageStore.module.css';

export const PageStore = () => {
   const { personId, page = 1 } = useParams();
   const navigate = useNavigate();
   const { data: richPeople = [] } = useGetRichHumansQuery(personId);
   const { data: products = [], isLoading } = useGetProductsQuery();

   const [searchQuery, setSearchQuery] = useState('');
   const [purchases, setPurchases] = useState({});
   const [isPurchasesOpen, setIsPurchasesOpen] = useState(false);
   const [animationKey, setAnimationKey] = useState(0);

   const richPerson = richPeople[0] || {};
   const initialWealth = richPerson.wealth || 0;
   const ITEMS_PER_PAGE = 9;
   const currentPage = Number(page);

   const totalSpent = Object.values(purchases).reduce(
      (sum, { quantity, price }) => sum + quantity * price,
      0
   );
   const currentBalance = initialWealth - totalSpent;

   useEffect(() => {
      setAnimationKey(prev => prev + 1);
   }, [currentBalance]);

   const handlePurchase = (product) => {
      if (currentBalance - product.price >= 0) {
         setPurchases(prev => ({
            ...prev,
            [product.id]: {
               quantity: (prev[product.id]?.quantity || 0) + 1,
               price: product.price,
               name: product.name
            }
         }));
      }
   };

   const handleRemove = (productId) => {
      setPurchases(prev => {
         const updated = { ...prev };
         if (updated[productId].quantity > 1) {
            updated[productId].quantity -= 0.5;
         } else {
            delete updated[productId];
         }
         return updated;
      });
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
                     ${currentBalance.toLocaleString()}
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
                                       (${(item.quantity * item.price).toLocaleString()})
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
                  paginatedProducts.map(product => (
                     <div key={product.id} className={s.productCard}>
                        <h3 className={s.productName}>{product.name}</h3>
                        <p className={s.productDescription}>{product.description}</p>
                        <div className={s.productFooter}>
                           <span className={s.productPrice}>
                              ${product.price.toLocaleString()}
                           </span>
                           <button
                              className={s.buyButton}
                              onClick={() => handlePurchase(product)}
                              disabled={currentBalance - product.price < 0}
                           >
                              Buy ({purchases[product.id]?.quantity || 0})
                           </button>
                        </div>
                     </div>
                  ))
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