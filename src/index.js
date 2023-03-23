import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './global.css';
import App from './App';
import { CartProvider } from './contexts/CartContext';

ReactDOM.render(
  <React.StrictMode>
    <CartProvider>
      <App />s
    </CartProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
