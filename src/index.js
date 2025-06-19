

 import React from 'react';
 import ReactDOM from 'react-dom/client';
 import './index.css';

 import App from './App';
 import 'bootstrap-icons/font/bootstrap-icons.css';
 import 'bootstrap/dist/css/bootstrap.min.css';

 import { BrowserRouter } from 'react-router-dom';
 import { WishlistProvider } from './Contexts/WishlistContext';
 import { CartProvider } from './Contexts/CartContext';
import { AuthProvider } from './Contexts/AuthContext'; 
 const root = ReactDOM.createRoot(document.getElementById('root'));

 root.render(
   <BrowserRouter>
   <AuthProvider>
     <WishlistProvider>
       <CartProvider>

         <App />
       </CartProvider>
     </WishlistProvider>
     </AuthProvider>
   </BrowserRouter>
 );

















