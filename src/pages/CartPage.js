
import React from 'react';
import { useCart } from '../Contexts/CartContext';
import { useWishlist } from '../Contexts/WishlistContext';
import './CartPage.css';
import CartSummary from './CartSummary';

const SIZE_OPTIONS = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size'];

const CartPage = () => {
  const {
    cartItems = [], // fallback to empty array
    removeFromCart,
    updateCartItemSize,
    updateCartItemQuantity,
  } = useCart();

  const { addToWishlist, wishlist = [] } = useWishlist(); // fallback to empty array

  const handleSaveToWishlist = (item) => {
    addToWishlist(item);
    removeFromCart(item.id, item.selectedSize);
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = Math.floor(total * 0.077); // 7.7% discount

  return (
    <div className="cart-page-wrapper">
      <div className="cart-container">
        <h2 className="cart-heading">My Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="cart-list">
            {cartItems.map((item, index) => (
              <div
                key={`${item.id}-${item.selectedSize}-${index}`}
                className="cart-item"
              >
                <img
                  src={item.image || '/images/placeholder.jpg'}
                  alt={item.title}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <div className="cart-item-header">
                    <p className="brand">{item.brand}</p>
                    <p className="title">{item.title}</p>
                    <div className="price-row">
                      <span className="price">₹{item.price}</span>
                    </div>
                  </div>

                  <div className="size-qty-row">
                    <label>
                      Size:
                      <select
                        value={item.selectedSize}
                        onChange={(e) =>
                          updateCartItemSize(item.id, e.target.value)
                        }
                      >
                        {SIZE_OPTIONS.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label>
                      Qty:
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartItemQuantity(item.id, parseInt(e.target.value))
                        }
                      >
                        {[1, 2, 3, 4, 5].map((qty) => (
                          <option key={qty} value={qty}>
                            {qty}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="cart-actions">
                    <span className="delivery-date">Delivery in 5–7 days</span>
                    <div className="action-buttons">
                      <button
                        className="wishlist-button"
                        onClick={() => handleSaveToWishlist(item)}
                      >
                        Save to Wishlist
                      </button>
                      <button
                        className="remove-button"
                        onClick={() =>
                          removeFromCart(item.id, item.selectedSize)
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right side summary */}
      <div className="cart-summary-container">
        <CartSummary total={total} discount={discount} wishlistCount={wishlist.length} />
      </div>
    </div>
  );
};

export default CartPage;


// // pages/CartPage.js
// import React from 'react';
// import { useCart } from '../Contexts/CartContext';
// import './CartPage.css'; // Link to the CSS file

// const CartPage = () => {
//   const { cartItems, removeFromCart } = useCart();

//   return (
//     <div className="cart-container">
//       <h2 className="cart-heading">My Cart</h2>

//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <div className="cart-list">
//           {cartItems.map((item) => (
//             <div key={item.id} className="cart-item">
//               <img
//                 src={item.image || '/images/placeholder.jpg'}
//                 alt={item.title}
//                 className="cart-item-image"
//               />
//               <div className="cart-item-details">
//                 <div className="cart-item-header">
//                   <h4 className="brand">{item.brand}</h4>
//                   <p className="title">{item.title}</p>
//                   <div className="price-row">
//                     <span className="price">₹{item.price}</span>
//                     {item.originalPrice && (
//                       <>
//                         <span className="original-price">₹{item.originalPrice}</span>
//                         <span className="discount">
//                           ₹{item.originalPrice - item.price} Off
//                         </span>
//                       </>
//                     )}
//                   </div>
//                   <p className="color">Color: {item.color}</p>
//                 </div>

//                 <div className="size-qty-row">
//                   <label>
//                     Size:
//                     <select defaultValue={item.size}>
//                       {(item.availableSizes || [item.size || 'Free Size']).map((size) => (
//                         <option key={size}>{size}</option>
//                       ))}
//                     </select>
//                   </label>

//                   <label>
//                     Qty:
//                     <select defaultValue={item.quantity}>
//                       {[1, 2, 3, 4, 5].map((q) => (
//                         <option key={q}>{q}</option>
//                       ))}
//                     </select>
//                   </label>

//                   {item.stock === 1 && <span className="stock-warning">Only 1 left</span>}
//                 </div>

//                 <div className="cart-actions">
//                   {item.deliveryDate && (
//                     <span className="delivery-date">🚚 Delivery by {item.deliveryDate}</span>
//                   )}
//                   <div className="action-buttons">
//                     <button className="wishlist-button">♡ Save to wishlist</button>
//                     <button
//                       className="remove-button"
//                       onClick={() => removeFromCart(item.id)}
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartPage;


// // pages/CartPage.js
// import React from 'react';
// import { useCart } from '../Contexts/CartContext';

// const CartPage = () => {
//   const { cartItems, removeFromCart } = useCart();

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>My Cart</h2>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
//           {cartItems.map((item) => (
//             <div
//               key={item.id}
//               style={{
//                 border: '1px solid #ccc',
//                 borderRadius: '8px',
//                 width: '170px',
//                 textAlign: 'center',
//                 padding: '10px',
//                 boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
//               }}
//             >
//               <img
//                 src={item.image || '/images/placeholder.jpg'}
//                 alt={item.title}
//                 style={{
//                   width: '100%',
//                   height: '200px',
//                   objectFit: 'cover',
//                   borderRadius: '8px',
//                 }}
//               />
//               <h4 style={{ margin: '10px 0 5px' }}>{item.brand}</h4>
//               <p style={{ fontSize: '14px', margin: '5px 0' }}>{item.title}</p>
//               <p style={{ fontWeight: 'bold', margin: '5px 0' }}>₹{item.price}</p>
//               <p style={{ color: '#888', fontSize: '14px' }}>
//                 Quantity: {item.quantity}
//               </p>
//               <button
//                 onClick={() => removeFromCart(item.id)}
//                 style={{
//                   backgroundColor: '#ff3b3b',
//                   color: '#fff',
//                   border: 'none',
//                   padding: '8px 12px',
//                   borderRadius: '4px',
//                   cursor: 'pointer',
//                   marginTop: '8px',
//                 }}
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartPage;
