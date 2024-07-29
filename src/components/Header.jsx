import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../assets/logo.png';

const Header = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/auth');
  };

  return (
    <header className={styles.header}>
      <img src={logo} alt="Formbot Logo" className={styles.logo} />
      <div className={styles.right}>
        <button className={styles.button1} onClick={handleSignInClick}>Sign In</button>
        <button className={styles.button2} onClick={handleSignInClick}>Create a Formbot</button>
      </div>
    </header>
  );
};

export default Header;
