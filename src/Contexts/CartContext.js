




 import React, { createContext, useState, useContext, useEffect } from 'react';

 const CartContext = createContext();

 export const CartProvider = ({ children }) => {
   const [cartItems, setCartItems] = useState(() => {
     const savedCart = localStorage.getItem('cart');
     return savedCart ? JSON.parse(savedCart) : [];
   });

   useEffect(() => {
     localStorage.setItem('cart', JSON.stringify(cartItems));
   }, [cartItems]);

   const addToCart = (item) => {
     const original = item.originalPrice || item.price;
     const price = item.price;

     let flatDiscount = 0;
     if (item.originalPrice && item.originalPrice > item.price) {
       flatDiscount = item.originalPrice - item.price;
     } else if (
       item.discount &&
       !isNaN(item.discount) &&
       item.originalPrice &&
       item.discount > 0
     ) {
       flatDiscount = Math.round((item.discount / 100) * item.originalPrice);
     }

     const cartItem = {
       id: item.id,
       title: item.title,
       brand: item.brand,
       price: price,
       originalPrice: original,
       discount: flatDiscount, // Flat ₹ discount per item
       image:
         item.images && item.images.length > 0
           ? typeof item.images[0] === 'string'
             ? item.images[0]
             : item.images[0].url
           : item.image || '/images/placeholder.jpg',
       quantity: 1,
       selectedSize: item.selectedSize || 'Free Size',
     };

     setCartItems((prevItems) => {
       const existingItem = prevItems.find(
         (i) => i.id === cartItem.id && i.selectedSize === cartItem.selectedSize
       );

       if (existingItem) {
         return prevItems.map((i) =>
           i.id === cartItem.id && i.selectedSize === cartItem.selectedSize
             ? { ...i, quantity: i.quantity + 1 }
             : i
         );
       } else {
         return [...prevItems, cartItem];
       }
     });
   };

   const removeFromCart = (itemId, selectedSize) => {
     setCartItems((prevItems) =>
       prevItems.filter(
         (item) => !(item.id === itemId && item.selectedSize === selectedSize)
       )
     );
   };

   const updateCartItemSize = (itemId, oldSize, newSize) => {
     setCartItems((prevItems) => {
       const itemToUpdate = prevItems.find(
         (item) => item.id === itemId && item.selectedSize === oldSize
       );
       if (!itemToUpdate) return prevItems;

       const existingItemWithNewSize = prevItems.find(
         (item) => item.id === itemId && item.selectedSize === newSize
       );

      if (existingItemWithNewSize) {
         // Merge quantities if new size item exists
         return prevItems
           .filter((item) => !(item.id === itemId && item.selectedSize === oldSize))
           .map((item) =>
             item.id === itemId && item.selectedSize === newSize
               ? { ...item, quantity: item.quantity + itemToUpdate.quantity }
               : item
           );
       } else {
         return prevItems.map((item) =>
           item.id === itemId && item.selectedSize === oldSize
             ? { ...item, selectedSize: newSize }
             : item
         );
       }
     });
   };

   const updateCartItemQuantity = (itemId, selectedSize, newQuantity) => {
     setCartItems((prevItems) => {
       if (newQuantity <= 0) {
         return prevItems.filter(
           (item) => !(item.id === itemId && item.selectedSize === selectedSize)
         );
       }
       return prevItems.map((item) =>
         item.id === itemId && item.selectedSize === selectedSize
           ? { ...item, quantity: newQuantity }
           : item
       );
     });
   };

   const clearCart = () => {
     setCartItems([]);
   };

   return (
     <CartContext.Provider
       value={{
         cartItems,
         addToCart,
         removeFromCart,
         clearCart,
         updateCartItemSize,
         updateCartItemQuantity,
       }}
     >
       {children}     </CartContext.Provider>
   );
 };

 export const useCart = () => useContext(CartContext);

 export default CartContext;
