import React, { useState, useEffect } from 'react';
import { searchBoardGames, getMostRatedGames } from '../BoardGameGeekAPI';
import styles from './ProductList.module.css';
import { Link } from 'react-router-dom';

function ProductList() {
  const [boardGames, setBoardGames] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (searchQuery.trim()) {
      searchBoardGames(searchQuery).then((results) => setBoardGames(results));
    } else {
      getMostRatedGames().then((results) => setBoardGames(results));
    }
  }, [searchQuery]);
  

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Board Game List</h1>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search board games..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul className={styles.boardGamesList}>
        {boardGames.map((game) => (
          <li key={game.id} className={styles.boardGamesListItem}>
            <Link to={`/products/${game.id}`}>
              {game.name} ({game.yearPublished})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
