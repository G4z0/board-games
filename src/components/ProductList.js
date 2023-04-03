import React, { useState, useEffect } from 'react';
import { searchBoardGames } from '../BoardGameGeekAPI';
import styles from './BoardGameList.module.css';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getNewestGames, getBoardGameDetails } from '../BoardGameGeekAPI';
import { useCart } from '../contexts/CartContext';

function ProductList() {
  const [boardGames, setBoardGames] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredGames, setFeaturedGames] = useState([]);
  const { addToCart } = useCart();
  const [showBoardGames, setShowBoardGames] = useState(true);

  useEffect(() => {
    if (searchQuery.trim()) {
      searchBoardGames(searchQuery).then( (results) => setBoardGames(results));
    } else {
      setBoardGames([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    getNewestGames().then((games) => {
      Promise.all(
        games.map((game) =>
          getBoardGameDetails(game.id).then((gameDetails) => ({
            ...gameDetails,
            price: (Math.random() * (100 - 20) + 20).toFixed(2),
          }))
        )
      ).then((gameDetails) => setFeaturedGames(gameDetails));
    });
  }, []);

  const handleAddToCart = (game) => {
    console.log("Adding product to cart:", game);
    addToCart(game);
  };

  const handleToggleBoardGames = () => {
    setShowBoardGames(!showBoardGames);
  };
  
  return (
    <div>
      <Navbar />
      <div className={styles.BoardGameList_container}>
        <div className={styles.BoardGameList_searchInputContainer}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search For a Board Game"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className={styles.toggleButton} onClick={handleToggleBoardGames}>
            {showBoardGames ? "Hide" : "Show"}
          </button>
        </div>
        {showBoardGames && (
          <ul className={styles.BoardGameList_boardGamesList}>
            {boardGames.map((game) => (
              <li 
                key={game.id} 
                className={styles.boardGamesListItem}
                >
                    <Link to={`/products/${game.id}`}
                    className={styles.boardGamesListItem__link}
                    >
                      {game.name} ({game.yearPublished})
                    </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="featured__container">
        {featuredGames.map((game) => (
          <div key={game.id} className="featured__game">
            <img src={game.image} alt={game.name} className="featured__game-image" />
            <div className="game-info">
            <h3 className="featured__game-name">{game.name}</h3>
            <p className="featured__game-price">${game.price}</p>
            </div>
            <button className={styles.addToCartButton} onClick={() => handleAddToCart(game)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;