
import React from 'react';
import styles from './LandingPage.module.css';
import image from '../assets/img1.png';
import image2 from '../assets/img2.png';
import image3 from '../assets/img3.png';

const LandingPage = () => {
  
  return (
    <div className={styles.container}>
        <div className={styles.subcontainer}>
        <img src={image3} alt="curve" className={styles.image3}/> 
      <h1 className={styles.heading}>Build advanced chatbots visually</h1>
      <img src={image2} alt="curve" className={styles.image2}/>
      </div>
      <p className={styles.paragraph}>Typebot gives you powerful blocks to create unique chat experiences. Embed them
      anywhere on your web/mobile apps and start collecting results like magic.</p>
      <button className={styles.button}>Create a FormBot for Free</button>
      <img src={image} alt="Formbot Example" className={styles.image} />
    </div>
  );
};

export default LandingPage;
