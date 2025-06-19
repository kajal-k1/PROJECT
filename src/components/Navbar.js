

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiHeart, FiShoppingBag, FiChevronDown } from 'react-icons/fi';
import { useWishlist } from '../Contexts/WishlistContext';
import { useCart } from '../Contexts/CartContext';
import BrandsDropdown from './BrandsDropdown';
import CategoryDropdown from './CategoryDropdown';
import './Navbar.css';

const NavigationBar = () => {
  const navigate = useNavigate();
  const { wishlistItems } = useWishlist();
  const { cartItems } = useCart();

  const [showBrands, setShowBrands] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <nav className="navigation-bar">
      <div className="logo">
        <span className="logo-tata">TATA</span>
        <span className="logo-cliq">CLiQ</span>
        <span className="logo-fashion">FASHION</span>
      </div>

      <div className="nav-main-content">
        <div className="nav-links">
          <div
            className="categories-dropdown-wrapper"
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
            style={{ position: 'relative', display: 'inline-block' }}
          >
            <button className="nav-link-button categories-button">
              Categories <FiChevronDown size={16} />
            </button>
            {showCategories && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  zIndex: 1000,
                  backgroundColor: 'white',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  borderRadius: '4px',
                }}
              >
                <CategoryDropdown />
              </div>
            )}
          </div>

          <div
            className="brands-dropdown-wrapper"
            onMouseEnter={() => setShowBrands(true)}
            onMouseLeave={() => setShowBrands(false)}
            style={{ position: 'relative', display: 'inline-block' }}
          >
            <button className="nav-link-button brands-button">
              Brands <FiChevronDown size={16} />
            </button>
            {showBrands && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  zIndex: 1000,
                  backgroundColor: 'white',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  borderRadius: '4px',
                }}
              >
                <BrandsDropdown />
              </div>
            )}
          </div>
        </div>

        <div className="search-bar">
          <FiSearch
            className="search-icon"
            size={20}
            style={{ cursor: 'pointer' }}
            onClick={handleSearch}
          />
          <input
            type="text"
            placeholder="Search for Brands or Products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="nav-right">
          <button className="icon-button" onClick={() => navigate('/wishlist')}>
            <FiHeart size={24} />
            {wishlistItems.length > 0 && <span className="badge">{wishlistItems.length}</span>}
          </button>
          <button className="icon-button" onClick={() => navigate('/cart')}>
            <FiShoppingBag size={24} />
            {cartItems.length > 0 && <span className="badge">{cartItems.length}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;

