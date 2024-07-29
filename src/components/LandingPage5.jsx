
import React from 'react';
import styles from './LandingPage5.module.css';
import image1 from '../assets/img12.png';
import image2 from '../assets/img13.png';

const LandingPage5 = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>And many more features</h1>
      <p className={styles.paragraph}>Typebot makes form building easy and comes with powerful features
      </p>
      <img src={image1} alt="Example 1" className={styles.image} />
      <h5 className={styles.heading}>Loved by teams and creators from all around the world</h5>
      <img src={image2} alt="Example 2" className={styles.image} />
    </div>
  );
};

export default LandingPage5;
