
import React from 'react';
import styles from './AuthPage.module.css';

const AuthFormContainer = ({ children }) => {
  return <div className={styles.formContainer}>{children}</div>;
};

export default AuthFormContainer;
