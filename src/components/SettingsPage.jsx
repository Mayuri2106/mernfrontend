import React, { useState } from 'react';
import { MdLockOutline } from 'react-icons/md';
import { CiUser } from 'react-icons/ci';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import styles from './SettingsPage.module.css';
import LogoutButton from './LogoutButton';

const SettingsPage = () => {
  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    oldPassword: '',
    newPassword: '',
  });

  const [errors, setErrors] = useState({}); // Added error state

  const { name, email, oldPassword, newPassword } = formData;

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No authentication token found');
      setErrors({ form: 'No authentication token found' });
      return;
    }
  
    try {
      const response = await fetch('https://mernapp-v7s9.onrender.com/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert(data.msg);
      } else {
        const errorData = await response.json();
        setErrors({ form: errorData.msg || 'An error occurred' });
      }
    } catch (error) {
      console.error('Error updating user details:', error);
      setErrors({ form: 'Server error' });
    }
  };
  

  return (
    <div className={styles.container}>
      <LogoutButton />
      <div className={styles.formContainer}>
        <h1>Settings</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
            <CiUser className={styles.icon} />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={handleInputChange}
              className={styles.inputField}
            />
            {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
          </div>
          <div className={styles.inputWrapper}>
            <MdLockOutline className={styles.icon} />
            <input
              type="email"
              name="email"
              placeholder="Update Email"
              value={email}
              onChange={handleInputChange}
              className={styles.inputField}
              autoComplete="email"
            />
            {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
          </div>
          <div className={styles.inputWrapper}>
            <MdLockOutline className={styles.icon} />
            <input
              type={showPasswords.oldPassword ? 'text' : 'password'}
              name="oldPassword"
              placeholder="Old Password"
              value={oldPassword}
              onChange={handleInputChange}
              className={styles.inputField}
              autoComplete="current-password"
            />
            {showPasswords.oldPassword ? (
              <FiEyeOff className={styles.eye} onClick={() => togglePasswordVisibility('oldPassword')} />
            ) : (
              <FiEye className={styles.eye} onClick={() => togglePasswordVisibility('oldPassword')} />
            )}
            {errors.oldPassword && <p className={styles.errorMessage}>{errors.oldPassword}</p>}
          </div>
          <div className={styles.inputWrapper}>
            <MdLockOutline className={styles.icon} />
            <input
              type={showPasswords.newPassword ? 'text' : 'password'}
              name="newPassword"
              placeholder="New Password"
              value={newPassword}
              onChange={handleInputChange}
              className={styles.inputField}
              autoComplete="new-password"
            />
            {showPasswords.newPassword ? (
              <FiEyeOff className={styles.eye} onClick={() => togglePasswordVisibility('newPassword')} />
            ) : (
              <FiEye className={styles.eye} onClick={() => togglePasswordVisibility('newPassword')} />
            )}
            {errors.newPassword && <p className={styles.errorMessage}>{errors.newPassword}</p>}
          </div>
          <button type="submit" className={styles.updateButton}>Update</button>
          {errors.form && <p className={styles.errorMessage}>{errors.form}</p>}
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
