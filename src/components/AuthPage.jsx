// src/components/AuthPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import styles from './AuthPage.module.css';
import topLeftImage from '../assets/img17.png';
import image1 from '../assets/img14.png';
import image2 from '../assets/img15.png';
import image3 from '../assets/img16.png';

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(true);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  

  const handleTopLeftImageClick = () => {
    navigate('/'); 
  };

  return (
    <>
    
    <img src={topLeftImage} alt="Top Left" className={styles.imageTopLeft} onClick={handleTopLeftImageClick}/>
    
    <img src={image2} alt="Decorative" className={styles.image2} />
    <div className={styles.authContainer}>
      <img src={image1} alt="Decorative" className={styles.image1} />
      {isSignup ?   <LoginForm toggleForm={toggleForm} /> : <SignupForm toggleForm={toggleForm}  />}
    </div>
    
      <img src={image3} alt="Decorative" className={styles.image3} />
    </>
  );
};

export default AuthPage;



