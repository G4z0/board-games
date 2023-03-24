// src/components/BoardGameNews.js

import React, { useState, useEffect } from 'react';
import styles from './BoardGameNews.module.css';

const BoardGameNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function fetchNews() {
      const fetchedNews = await getBoardGameNews(); // Replace this with your API call
      setNews(fetchedNews);
    }
    fetchNews();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Board Game News</h2>
      <ul className={styles.newsList}>
        {news.map((newsItem) => (
          <li key={newsItem.id} className={styles.newsItem}>
            <a href={newsItem.url} target="_blank" rel="noopener noreferrer">
              {newsItem.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BoardGameNews;
