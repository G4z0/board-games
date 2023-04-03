// src/components/Navbar.js
import React, { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <a href="/" className="navbar__logo">
        </a>
        <div className="navbar__menu-toggle" onClick={toggleMobileMenu}>
          <span className="navbar__menu-toggle-line"></span>
          <span className="navbar__menu-toggle-line"></span>
          <span className="navbar__menu-toggle-line"></span>
        </div>
        <ul className={`navbar__menu ${mobileMenuOpen ? 'navbar__menu--active' : ''}`}>
          <li className="navbar__menu-item">
            <a href="/products" className="navbar__menu-link">
              Products
            </a>
          </li>
          <li className="navbar__menu-item">
            <a href="/cart" className="navbar__menu-link">
              Cart
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
