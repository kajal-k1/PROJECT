

// import React from 'react';
// import { useWishlist } from '../Contexts/WishlistContext';
// import { useCart } from '../Contexts/CartContext';
// import { FaTrash } from 'react-icons/fa';

// const WishlistPage = () => {
//   const { wishlistItems, removeFromWishlist } = useWishlist();
//   const { addToCart } = useCart();

//   const handleAddToCart = (item) => {
//     addToCart(item); // item already includes selectedSize
//     removeFromWishlist(item.id, item.selectedSize); // remove specific size variant
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>My Wishlist</h2>
//       {wishlistItems.length === 0 ? (
//         <p>Your wishlist is empty.</p>
//       ) : (
//         <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
//           {wishlistItems.map((item, index) => (
//             <div
//               key={`${item.id}-${item.selectedSize}-${index}`}
//               style={{
//                 width: '240px',
//                 borderRadius: '12px',
//                 boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//                 overflow: 'hidden',
//                 position: 'relative',
//                 backgroundColor: '#fff',
//               }}
//             >
//               <div
//                 onClick={() => removeFromWishlist(item.id, item.selectedSize)}
//                 style={{
//                   position: 'absolute',
//                   top: '10px',
//                   right: '10px',
//                   backgroundColor: '#f2f2f2',
//                   borderRadius: '50%',
//                   padding: '6px',
//                   cursor: 'pointer',
//                 }}
//               >
//                 <FaTrash size={16} />
//               </div>

//               <img
//                 src={item.image || '/images/placeholder.jpg'}
//                 alt={item.title}
//                 style={{ width: '100%', height: '320px', objectFit: 'cover' }}
//               />

//               <button
//                 style={{
//                   width: '100%',
//                   backgroundColor: '#d61f5a',
//                   color: '#fff',
//                   padding: '10px',
//                   fontWeight: 'bold',
//                   border: 'none',
//                   cursor: 'pointer',
//                 }}
//                 onClick={() => handleAddToCart(item)}
//               >
//                 Add to Bag
//               </button>

//               <div style={{ padding: '10px' }}>
//                 <h4 style={{ margin: '5px 0', fontWeight: 'bold' }}>{item.brand}</h4>
//                 <p style={{ margin: '5px 0', fontSize: '14px', color: '#555' }}>{item.title}</p>
//                 <p style={{ fontSize: '13px', color: '#444' }}>
//                   Size: <strong>{item.selectedSize}</strong>
//                 </p>
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                   <span style={{ fontWeight: 'bold' }}>₹{item.price}</span>
//                   {item.originalPrice && (
//                     <>
//                       <span
//                         style={{
//                           textDecoration: 'line-through',
//                           color: '#888',
//                           fontSize: '13px',
//                         }}
//                       >
//                         ₹{item.originalPrice}
//                       </span>
//                       <span style={{ color: 'green', fontSize: '13px' }}>
//                         {item.discountPercent ||
//                           Math.round(
//                             ((item.originalPrice - item.price) / item.originalPrice) * 100
//                           )}
//                         % Off
//                       </span>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default WishlistPage;

import React from 'react';
import { useWishlist } from '../Contexts/WishlistContext';
import { useCart } from '../Contexts/CartContext';
import { FaTrash } from 'react-icons/fa';

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (item) => {
    addToCart(item); // Add the item (with selectedSize) to cart
    removeFromWishlist(item.id, item.selectedSize); // Remove from wishlist after adding
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>My Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {wishlistItems.map((item, index) => (
            <div
              key={`${item.id}-${item.selectedSize}-${index}`}
              style={{
                width: '240px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                position: 'relative',
                backgroundColor: '#fff',
              }}
            >
              {/* Remove button */}
              <div
                onClick={() => removeFromWishlist(item.id, item.selectedSize)}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: '#f2f2f2',
                  borderRadius: '50%',
                  padding: '6px',
                  cursor: 'pointer',
                }}
                title="Remove from wishlist"
              >
                <FaTrash size={16} />
              </div>

              {/* Product image */}
              <img
                src={item.image || '/images/placeholder.jpg'}
                alt={item.title}
                style={{ width: '100%', height: '320px', objectFit: 'cover' }}
              />

              {/* Add to cart button */}
              <button
                style={{
                  width: '100%',
                  backgroundColor: '#d61f5a',
                  color: '#fff',
                  padding: '10px',
                  fontWeight: 'bold',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onClick={() => handleAddToCart(item)}
              >
                Add to Bag
              </button>

              {/* Product info */}
              <div style={{ padding: '10px' }}>
                <h4 style={{ margin: '5px 0', fontWeight: 'bold' }}>{item.brand}</h4>
                <p style={{ margin: '5px 0', fontSize: '14px', color: '#555' }}>{item.title}</p>
                <p style={{ fontSize: '13px', color: '#444' }}>
                  Size: <strong>{item.selectedSize}</strong>
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: 'bold' }}>₹{item.price}</span>
                  {item.originalPrice && (
                    <>
                      <span
                        style={{
                          textDecoration: 'line-through',
                          color: '#888',
                          fontSize: '13px',
                        }}
                      >
                        ₹{item.originalPrice}
                      </span>
                      <span style={{ color: 'green', fontSize: '13px' }}>
                        {item.discountPercent ||
                          Math.round(
                            ((item.originalPrice - item.price) / item.originalPrice) * 100
                          )}
                        % Off
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
