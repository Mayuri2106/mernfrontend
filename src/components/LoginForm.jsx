import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthFormContainer from './AuthFormContainer';
import styles from './AuthPage.module.css';

const LoginForm = ({ toggleForm }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    if (value.trim() === '') {
      setErrors((prevErrors) => ({ ...prevErrors, [id]: 'This field is required' }));
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

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch('https://mernapp-v7s9.onrender.com/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          // Store the token in localStorage
          localStorage.setItem('token', data.token);

          navigate('/FormDashboard');
        } else {
          setErrors({ ...newErrors, form: data.msg || 'An error occurred' });
        }
      } catch (error) {
        console.error('Login Error:', error);
        setErrors({ ...newErrors, form: 'Server error' });
      }
    }
  };

  return (
    <AuthFormContainer>
      <form onSubmit={handleSubmit}>
        <label className={styles.formLabel} htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          className={styles.formInput}
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}

        <label className={styles.formLabel} htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          className={styles.formInput}
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.password && <p className={styles.errorMessage}>{errors.password}</p>}

        <button type="submit" className={styles.formButton}>Log In</button>

        <p className={styles.login} style={{ cursor: 'pointer'}}>
          Don't have an account? <div onClick={toggleForm} className={styles.Link}>Register Now</div>
        </p>
      </form>
    </AuthFormContainer>
  );
};

export default LoginForm;
