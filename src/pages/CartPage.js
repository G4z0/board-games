import React, { useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import Navbar from '../components/Navbar';
import styles from './CartPage.module.css';

function CartPage() {
  const { cart, removeFromCart, incrementItem, decrementItem } = useCart();

  const handleIncrementItem = (itemId) => {
    incrementItem(itemId);
  };

  const handleDecrementItem = (itemId) => {
    decrementItem(itemId);
  };

  useEffect(() => {
    console.log('CartPage cart contents:', cart);
  }, [cart]);

  const totalCost = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.cartHeader}>Your Cart</h1>
        {cart.length === 0 && <p className={styles.cartEmpty}>Your cart is empty</p>}
        <ul>
          {cart.map((item) => (
            <li key={item.id} className={styles.cartItem}>
              <span className={styles.cartItemName}>{item.name}</span>
              <span className={styles.cartItemQuantity}>
                <button className={styles.cartItemButton} onClick={() => handleDecrementItem(item.id)}>
                  -
                </button>
                <span className={styles.cartItemQuantityNumber}>{item.quantity}</span>
                <button className={styles.cartItemButton} onClick={() => handleIncrementItem(item.id)}>
                  +
                </button>
              </span>
              <span className={styles.cartItemPrice}>${item.price}</span>
              <button className={styles.removeButton} onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
        {cart.length > 0 && (
          <div className={styles.totalCost}>
            Total cost: ${totalCost.toFixed(2)}
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
