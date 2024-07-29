import React from 'react';
import styles from './ConfirmationPopup.module.css';

const ConfirmationPopup = ({ message, onConfirm, onCancel }) => {
  return (
    <div className={styles.popup}>
      <h3>{message}</h3>
      <div className={styles.buttons}>
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
