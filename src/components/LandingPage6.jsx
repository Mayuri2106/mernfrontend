
import React from 'react';
import styles from './LandingPage6.module.css';
import leftImage from '../assets/img3.png';
import rightImage from '../assets/img2.png';

const LandingPage6 = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.textContent}>
            
        <img src={leftImage} alt="Left" className={styles.leftImage} />
          <h1 className={styles.heading}>Improve conversion and user engagement
          with FormBots </h1>
          <button className={styles.createButton}>Create a Formbot</button>
          <p className={styles.para}>No trial. Generous <b>free</b> plan.</p>
        </div>
        <img src={rightImage} alt="Right" className={styles.rightImage} />
      </div>
    </div>
  );
};

export default LandingPage6;
