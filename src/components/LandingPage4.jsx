import React from 'react';
import styles from './LandingPage4.module.css';
import exampleImage from '../assets/img11.png';

const LandingPage4 = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Collect results in real-time</h1>
      <p className={styles.paragraph}>One of the main advantage of a chat application is that you collect the user's responses on each question.
      You won't lose any valuable data.
      </p>
      <img src={exampleImage} alt="Example" className={styles.image} />
    </div>
  );
};

export default LandingPage4;
