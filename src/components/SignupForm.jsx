import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthFormContainer from './AuthFormContainer';
import styles from './AuthPage.module.css';

const SignupForm = ({ toggleForm }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));

    if (value.trim() === '') {
      setErrors((prevErrors) => ({ ...prevErrors, [id]: 'This field is required' }));
    } else if (id === 'confirmPassword' && value !== formData.password) {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: 'Passwords do not match' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [id]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (formData[key].trim() === '') {
        newErrors[key] = 'This field is required';
      }
    });

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch('https://mernapp-v7s9.onrender.com/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          toggleForm(); 
        } else {
          const data = await response.json();
          setErrors({ ...newErrors, form: data.msg || 'An error occurred' });
        }
      } catch (error) {
        console.error('Signup Error:', error);
        setErrors({ ...newErrors, form: 'Server error' });
      }
    }
  };

  return (
    <AuthFormContainer>
      <form onSubmit={handleSubmit}  >
        <label className={`${styles.formLabel} ${errors.username ? styles.errorLabel : ''}`} htmlFor="username">
          Username
        </label>
        <input
          id="username"
          type="text"
          placeholder="Username"
          className={`${styles.formInput} ${errors.username ? styles.errorInput : ''}`}
          value={formData.username}
          onChange={handleChange}
          required
          autoComplete="username" 
        />
        {errors.username && <p className={styles.errorMessage}>{errors.username}</p>}

        <label className={`${styles.formLabel} ${errors.email ? styles.errorLabel : ''}`} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          className={`${styles.formInput} ${errors.email ? styles.errorInput : ''}`}
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="email"
        />
        {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}

        <label className={`${styles.formLabel} ${errors.password ? styles.errorLabel : ''}`} htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          className={`${styles.formInput} ${errors.password ? styles.errorInput : ''}`}
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="new-password" // Added autocomplete attribute
        />
        {errors.password && <p className={styles.errorMessage}>{errors.password}</p>}

        <label className={`${styles.formLabel} ${errors.confirmPassword ? styles.errorLabel : ''}`} htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          className={`${styles.formInput} ${errors.confirmPassword ? styles.errorInput : ''}`}
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          autoComplete="new-password"
        />
        {errors.confirmPassword && <p className={styles.errorMessage}>{errors.confirmPassword}</p>}

        <button type="submit" className={styles.formButton} >Sign Up</button>

        {errors.form && <p className={styles.errorMessage}>{errors.form}</p>}

        <p className={styles.login} style={{ cursor: 'pointer' }}>
          Already have an account? <div onClick={toggleForm} className={styles.Link}>Login</div>
        </p>
      </form>
    </AuthFormContainer>
  );
};

export default SignupForm;
