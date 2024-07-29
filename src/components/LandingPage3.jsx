// src/components/MainContent.jsx
import React from 'react';
import styles from './LandingPage3.module.css';
import image1 from '../assets/img6.png';
import image2 from '../assets/img9.png';
import image3 from '../assets/img10.png';

const LandingPage3 = () => {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <img src={image1} alt="Example 1" className={styles.image} />
        <div className={styles.text}>
          <h2>Easy building
          experience</h2>
          <p>All you have to do is drag and
drop blocks to create your app.
Even if you have custom needs,
you can always add custom
code.</p>
        </div>
      </div>
      <div className={styles.section}>
      <img src={image2} alt="Example 2" className={styles.image} />
        <div className={styles.text}>
          <h2>Embed it in a click</h2>
          <p>Embedding your typebot in
your applications is a walk in
the park. Typebot gives you
several step-by-step platform-
specific instructions. Your
typebot will always feel "native".</p>
        </div>
    
      </div>
      <div className={styles.singleImageSection}>
        <img src={image3} alt="Example 3" className={styles.singleImage} />
        <div className={styles.singleImageText}>
          <h2>Integrate with any platform</h2>
          <p>Typebot offers several native integrations blocks as well as instructions on
          how to embed typebot on particular platforms</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage3;
