import React from 'react';
import styles from './Toast.module.css';

const Toast = ({ message, show }) => {
  return (
    <div className={`${styles.toast} ${show ? styles.show : ''}`}>
      {message}
    </div>
  );
};

export default Toast;
