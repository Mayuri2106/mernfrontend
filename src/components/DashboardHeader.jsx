import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import styles from './DashboardHeader.module.css';


const DashboardHeader = ({ username, dropdownOpen, toggleDropdown }) => {
  const dropdownRef = useRef(null);
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

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      toggleDropdown(false);
    }
  };

  const handleSettingsClick = () => {
    navigate('/setting'); 
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div ref={dropdownRef} className={styles.dropdownContainer}>
        <button
          onClick={() => toggleDropdown(!dropdownOpen)}
          className={styles.dropdownButton}
        >
          {username ? `${username}'s workspace` : 'Options'} 
          {dropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
        {dropdownOpen && (
          <div className={styles.dropdownMenu}>
            <button className={styles.menuItem} onClick={handleSettingsClick}>Settings</button>
            <button className={`${styles.menuItem} ${styles.logoutButton}`} onClick={handleLogout} >Log out</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;
