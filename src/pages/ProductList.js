// src/pages/BoardGameList.js
import React, { useState, useEffect } from 'react';
import { searchBoardGames } from '../BoardGameGeekAPI';

function ProductList() {
  const [boardGames, setBoardGames] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (searchQuery.trim()) {
      searchBoardGames(searchQuery).then((results) => setBoardGames(results));
    } else {
      setBoardGames([]);
    }
  }, [searchQuery]);

  return (
    <div>
      <h1>Board Game List</h1>
      <input
        type="text"
        placeholder="Search board games..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul>
        {boardGames.map((game) => (
          <li key={game.id}>
            {game.name} ({game.yearPublished})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
