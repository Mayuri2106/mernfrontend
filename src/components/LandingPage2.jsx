import React from 'react';
import styles from './LandingPage2.module.css';
import image1 from '../assets/img4.png';
import image2 from '../assets/img5.png';
import image4 from '../assets/img7.png';

const LandingPage2 = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Replace your old school forms with
      chatbots</h1>
      <p className={styles.paragraph}>Typebot is a better way to ask for information. It leads to an increase in customer satisfaction and retention and multiply by 3
      your conversion rate compared to classical forms.</p>
      <div className={styles.imageGrid}>
        <img src={image1} alt="Example 1" className={styles.image} />
        <img src={image2} alt="Example 2" className={styles.image} />
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="fullName">
              Full Name<span className={styles.requiredStar}>*</span>
            </label>
            <input type="text" id="fullName" name="fullName" placeholder='Full Name' required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">
              Email<span className={styles.requiredStar}>*</span>
            </label>
            <input type="email" id="email" name="email" placeholder='Email' required />
          </div>
          <div className={styles.formGroup}>
            <label>
            What services are you interested in?<span className={styles.requiredStar}>*</span>
            </label>
            <div className={styles.checkboxGroup}>
              <label>
                <input type="checkbox" name="option1" required />
               Website Dev
              </label>
              <label>
                <input type="checkbox" name="option2" required />
                Content Marketing
              </label>
              <label>
                <input type="checkbox" name="option3" required />
                Social Media
              </label>
              <label>
                <input type="checkbox" name="option4" required />
                UX/UI Design
              </label>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="additionalInfo">
              Additional Information<span className={styles.requiredStar}>*</span>
            </label>
            <textarea id="additionalInfo" name="additionalInfo" placeholder='Additional Information' required></textarea>
          </div>
          <button type="submit" className={styles.submitButton}>Submit</button>
        </form>
        <img src={image4} alt="Example 4"  className={`${styles.image7} ${styles.imageBorder}`} />
      </div>
    </div>
  );
};

export default LandingPage2;
