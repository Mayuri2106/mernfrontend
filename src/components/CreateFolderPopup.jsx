import React, { useState } from 'react';
import styles from './CreateFolderPopup.module.css';

const CreateFolderPopup = ({ onClose, onCreate }) => {
  const [folderName, setFolderName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (folderName.trim()) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://mernappbackend-iui9.onrender.com/folder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
          body: JSON.stringify({ name: folderName }),
        });
        if (response.ok) {
          const data = await response.json();
          onCreate(data);
          setFolderName(''); 
        } else {
          const errorData = await response.json();
          console.error('Failed to create folder:', errorData.msg);
        }
      } catch (error) {
        console.error('Error creating folder:', error);
      }
      onClose();
    }
  };

  return (
          <div className={styles.popup}>
        <h3>Create New Folder</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Folder Name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            required
          />
          <div className={styles.buttons}>
          <button type="submit">Done</button>
            <button type="button" onClick={onClose}>Cancel</button>
            
          </div>
        </form>
      </div>
   
  );
};

export default CreateFolderPopup;
