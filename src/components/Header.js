

import React from 'react';
import TopBar from './TopBar';
import Navbar from './Navbar';
import './Header.css'; // Import the CSS file

const Header = () => {
  return (
    <header className="app-header">
      <TopBar />
      <Navbar />
    </header>
  );
};

export default Header;
