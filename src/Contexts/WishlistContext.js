// import React, { createContext, useState, useContext, useEffect } from 'react';

// const WishlistContext = createContext();

// export const WishlistProvider = ({ children }) => {
//   const [wishlistItems, setWishlistItems] = useState(() => {
//     const savedWishlist = localStorage.getItem('wishlist');
//     return savedWishlist ? JSON.parse(savedWishlist) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
//   }, [wishlistItems]);

//   const addToWishlist = (item) => {
//     const wishlistItem = {
//       id: item.id,
//       title: item.title,
//       price: item.price,
//       brand: item.brand,
//       selectedSize: item.selectedSize || 'Free Size',
//       image:
//         item.images && item.images.length > 0
//           ? typeof item.images[0] === 'string'
//             ? item.images[0]
//             : item.images[0].url
//           : item.image || '/images/placeholder.jpg',
//     };

//     const exists = wishlistItems.some(
//       (product) =>
//         product.id === wishlistItem.id &&
//         product.selectedSize === wishlistItem.selectedSize
//     );

//     if (!exists) {
//       setWishlistItems((prev) => [...prev, wishlistItem]);
//     }
//   };

//   const removeFromWishlist = (itemId, selectedSize) => {
//     setWishlistItems((prev) =>
//       prev.filter(
//         (item) =>
//           !(item.id === itemId && item.selectedSize === selectedSize)
//       )
//     );
//   };

//   return (
//     <WishlistContext.Provider
//       value={{ wishlistItems, addToWishlist, removeFromWishlist }}
//     >
//       {children}
//     </WishlistContext.Provider>
//   );
// };

// export const useWishlist = () => useContext(WishlistContext);

// src/Contexts/WishlistContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (item) => {
    const wishlistItem = {
      id: item.id,
      title: item.title,
      price: item.price,
      brand: item.brand,
      selectedSize: item.selectedSize || 'Free Size',
      image:
        item.images?.[0]?.url ||
        (typeof item.images?.[0] === 'string' ? item.images[0] : null) ||
        item.image ||
        '/images/placeholder.jpg',
    };

    const exists = wishlistItems.some(
      (product) =>
        product.id === wishlistItem.id &&
        product.selectedSize === wishlistItem.selectedSize
    );

    if (!exists) {
      setWishlistItems((prev) => [...prev, wishlistItem]);
    }
  };

  const removeFromWishlist = (itemId, selectedSize) => {
    setWishlistItems((prev) =>
      prev.filter(
        (item) => !(item.id === itemId && item.selectedSize === selectedSize)
      )
    );
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        wishlistCount: wishlistItems.length, // ✅ Added wishlistCount
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook for accessing wishlist context
export const useWishlist = () => useContext(WishlistContext);
