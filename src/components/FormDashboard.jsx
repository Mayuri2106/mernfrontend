// FormDashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiPlus } from 'react-icons/hi';
import { FaTrashAlt } from 'react-icons/fa';
import DashboardHeader from './DashboardHeader';
import FolderList from './FolderList';
import FolderButton from './FolderButton';
import CreateFolderPopup from './CreateFolderPopup';
import ConfirmationPopup from './ConfirmationPopup';
import styles from './FormDashboard.module.css';

const FormDashboard = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [showPopup, setShowPopup] = useState(false); 
  const [folders, setFolders] = useState([]);
  const [forms, setForms] = useState([]); 
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formToDelete, setFormToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsername = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('https://mernappbackend-iui9.onrender.com/user', {
            method: 'GET',
            headers: {
              'x-auth-token': token,
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          if (response.ok) {
            setUsername(data.username);
          } else {
            console.error('Failed to fetch username:', data.msg);
          }
        } catch (error) {
          console.error('Error fetching username:', error);
        }
      }
    };

    fetchUsername();
  }, []);

  useEffect(() => {
    const fetchFolders = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('https://mernappbackend-iui9.onrender.com/folder', {
          method: 'GET',
          headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (response.ok) {
          setFolders(data);
        } else {
          console.error('Failed to fetch folders:', data.msg);
        }
      } catch (error) {
        console.error('Error fetching folders:', error);
      }
    };

    fetchFolders();
  }, [showPopup]); 

  useEffect(() => {
    const fetchForms = async () => {
      const token = localStorage.getItem('token');
      const queryParams = selectedFolderId ? `?folderId=${selectedFolderId}` : ''; 
      try {
        const response = await fetch(`https://mernappbackend-iui9.onrender.com/Form${queryParams}`, {
          method: 'GET',
          headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (response.ok) {
          setForms(data);
        } else {
          console.error('Failed to fetch forms:', data.msg);
        }
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };
  
    fetchForms();
  }, [selectedFolderId, showPopup]);

  useEffect(() => {
    // Retrieve the selected folder ID from localStorage
    const storedFolderId = localStorage.getItem('selectedFolderId');
    if (storedFolderId) {
      setSelectedFolderId(storedFolderId);
    }
  }, []);

  useEffect(() => {
    // Save the selected folder ID to localStorage
    if (selectedFolderId !== null) {
      localStorage.setItem('selectedFolderId', selectedFolderId);
    } else {
      localStorage.removeItem('selectedFolderId');
    }
  }, [selectedFolderId]);

  const toggleDropdown = (open) => {
    setDropdownOpen(open);
  };

  const handleCreateFolder = (newFolder) => {
    setFolders([...folders, newFolder]);
  };

  const handleDeleteFolder = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`https://mernappbackend-iui9.onrender.com/folder/${id}`, {
        method: 'DELETE',
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        setFolders(folders.filter(folder => folder._id !== id));
      } else {
        console.error('Failed to delete folder:', await response.json());
      }
    } catch (error) {
      console.error('Error deleting folder:', error);
    }
  };

  const handleDeleteForm = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`https://mernappbackend-iui9.onrender.com/Form/${id}`, {
        method: 'DELETE',
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        setForms(forms.filter(form => form._id !== id));
      } else {
        console.error('Failed to delete form:', await response.json());
      }
    } catch (error) {
      console.error('Error deleting form:', error);
    }
  };

  const handleDeleteFormClick = (form) => {
    setFormToDelete(form);
    setShowConfirmation(true);
  };

  const handleConfirmDeleteForm = () => {
    handleDeleteForm(formToDelete._id);
    setShowConfirmation(false);
    setFormToDelete(null);
  };

  const handleCreateTypebot = () => {
    navigate('/Workspace', { state: { folderId: selectedFolderId } }); 
  };

  const handleFolderClick = (id) => {
    setSelectedFolderId(prevId => (prevId === id ? null : id));
  };

  const handleFormClick = (id) => {
    navigate('/Workspace', { state: { formId: id } }); 
  };

  return (
    <div className={styles.main}>
      <DashboardHeader
        username={username}
        dropdownOpen={dropdownOpen}
        toggleDropdown={toggleDropdown}
      />
      <main>
        <div className={styles.wrapper} >
          <div className={styles.horizontalLine}></div>
          <FolderButton onClick={() => setShowPopup(true)} />
          <FolderList 
            folders={folders} 
            onDeleteFolder={handleDeleteFolder} 
            onFolderClick={handleFolderClick} 
            selectedFolderId={selectedFolderId} 
          />
        </div>
        <div className={styles.wrapper}>
          <button className={styles.createTypebotButton} onClick={handleCreateTypebot}>
            <span><HiPlus /></span> Create Typebot
          </button>
          {showPopup && (
            <CreateFolderPopup
              onClose={() => setShowPopup(false)}
              onCreate={handleCreateFolder}
            />
          )}
          {showConfirmation && (
          <ConfirmationPopup
            message="Are you sure you want to delete this form?"
            onConfirm={handleConfirmDeleteForm}
            onCancel={() => setShowConfirmation(false)}
          />
        )}
          <div className={styles.forms}  >
            {forms.filter(form => form.folderId === selectedFolderId || (!selectedFolderId && !form.folderId)).map(form => (
              <div key={form._id} className={styles.formItem} >
                <span
                  className={styles.formName}
                  onClick={() => handleFormClick(form._id)}
                >
                  {form.name}
                </span>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeleteFormClick(form)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            ))}
          </div>
        </div>
        
      </main>
    </div>
  );
};

export default FormDashboard;
