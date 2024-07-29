
import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from './SettingsPage.module.css';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch('https://mernappbackend-iui9.onrender.com/logout', {
        method: 'POST',
        headers: {
          'x-auth-token': localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
      });
      localStorage.removeItem('token');
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <button className={styles.logoutButton} onClick={handleLogout}>
      <FaSignOutAlt /> Log out
    </button>
  );
};

export default LogoutButton;
