import React, { useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import Navbar from '../components/Navbar';
import styles from './CartPage.module.css';

function CartPage() {
  const { cart } = useCart();

  useEffect(() => {
    console.log('CartPage cart contents:', cart);
  }, [cart]);

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
            <span className={styles.cartItemPrice}> &nbsp;${item.price} x {item.quantity}</span>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default CartPage;
