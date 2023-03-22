// src/pages/HomePage.js
import React from 'react';
import Navbar from '../components/Navbar';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <Navbar />
      <section className="hero">
        <div className="hero__content">
          <h1 className="hero__title">Discover Amazing Board Games</h1>
          <p className="hero__subtitle">Explore our handpicked collection of board games for endless fun with family and friends.</p>
          <a href="/products" className="hero__cta">Shop Now</a>
        </div>
      </section>
      <section className="featured">
        <h2 className="featured__title">Featured Games</h2>
        <div className="featured__container">
          {/* Render featured products here */}
        </div>
      </section>
      <footer className="footer">
        <p>© BoardGameStore 2023. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
