import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBoardGameDetails } from '../BoardGameGeekAPI';
import Navbar from '../components/Navbar';
import styles from './GameDetails.module.css';

function GameDetailsPage() {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    getBoardGameDetails(id).then((game) => setGame(game));
  }, [id]);

  if (!game) {
    return null;
  }

  const price = (Math.random() * (100 - 20) + 20).toFixed(2);

  return (
    <div>
    <Navbar />
    <div className={styles.gameDetails}>
      
      <div className={styles.contentWrapper}>
        <div className={styles.gameImageContainer}>
        <img src={game.image} alt={game.name} className={styles.gameImage} />
        </div>
        <div className={styles.gameInfoContainer}>
          <h2 className={styles.gameName}>{game.name}</h2>
          <p className={styles.gameYear}>Year Published: {game.yearPublished}</p>
          <p className={styles.gamePlayers}>Players: {game.minPlayers}-{game.maxPlayers}</p>
          <p className={styles.gamePlayingTime}>Playing Time: {game.playingTime} minutes</p>
          <p className={styles.gamePrice}>Price: ${price}</p>
          <p className={styles.gameDescription}>{game.description}</p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default GameDetailsPage;
