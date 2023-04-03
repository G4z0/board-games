import Navbar from '../components/Navbar';
import './HomePage.css';
import React, { useState, useEffect } from 'react';
import { getNewestGames, getBoardGameDetails } from '../BoardGameGeekAPI';

function HomePage() {
  const [featuredGames, setFeaturedGames] = useState([]);

  useEffect(() => {
    getNewestGames().then(games => {
      Promise.all(games.map(game => getBoardGameDetails(game.id)))
        .then(gameDetails => setFeaturedGames(gameDetails));
    });
  }, []);
  
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
        <h2 className="featured__title">Newest Games</h2>
        <div className="featured__container">
        {featuredGames.map(game => (
          <div key={game.id} className="featured__game">
            <img src={game.image} alt={game.name} className="featured__game-image" /> 
            <div className="game-info">
            <h3 className="featured__game-name">{game.name}</h3>
            </div>
          </div>
        ))}
        </div>
      </section>
      <footer className="footer">
        <p>© BoardGameStore 2023. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
