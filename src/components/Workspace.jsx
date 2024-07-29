import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiX, FiCheck } from 'react-icons/fi';
import { BiSolidFlagAlt } from "react-icons/bi";
import Sidebar from './Sidebar';
import Popup from './Popup';
import styles from './Workspace.module.css';
import theme1 from '../assets/lightImg.png';
import theme2 from '../assets/darkImg.png';
import theme3 from '../assets/blueImg.png';

const Workspace = () => {
  const [formName, setFormName] = useState('');
  const [mode, setMode] = useState(localStorage.getItem('mode') || 'default');
  const [selectedTheme, setSelectedTheme] = useState(localStorage.getItem('selectedTheme') || theme1);
  const [popups, setPopups] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [counters, setCounters] = useState({
    Text: 1,
    Image: 1,
    Video: 1,
    GIF: 1,
    TextInput: 1,
    NumberInput: 1,
    EmailInput: 1,
    PhoneInput: 1,
    DateInput: 1,
    RatingInput: 1,
    ButtonsInput: 1,
  });
  const [isShareButtonActive, setIsShareButtonActive] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const { folderId, formId } = location.state || {};

  useEffect(() => {
    if (formId) {
      const storedMode = localStorage.getItem(`form-${formId}-mode`);
      const storedTheme = localStorage.getItem(`form-${formId}-theme`);

      if (storedMode) setMode(storedMode);
      if (storedTheme) setSelectedTheme(storedTheme);
    }
  }, [formId]);

  useEffect(() => {
    const fetchForms = async () => {
      if (!formId) return;

      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`https://mernappbackend-iui9.onrender.com/Form/${formId}/Popups`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setMode(data.mode || 'default');
          setSelectedTheme(data.theme || theme1);
          setPopups(data.popups || []);
        } else {
          console.error('Failed to fetch forms:', data.msg);
        }
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };

    fetchForms();
  }, [formId]);

  useEffect(() => {
    if (formId) {
      localStorage.setItem(`form-${formId}-mode`, mode);
      localStorage.setItem(`form-${formId}-theme`, selectedTheme);
    }
  }, [formId, mode, selectedTheme]);

  const handleAddPopup = async (type) => {
    if (!formId) {
      console.error('Form ID is not defined');
      return;
    }

    const newPopup = {
      id: Date.now(),
      type,
      content: '',
      serialNo: counters[type],
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://mernappbackend-iui9.onrender.com/Form/${formId}/Popup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(newPopup),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, ${result.msg}`);
      }

      const result = await response.json();
      setPopups([...popups, result.popup]);
      setCounters(prevCounters => ({
        ...prevCounters,
        [type]: prevCounters[type] + 1,
      }));
    } catch (error) {
      console.error('Failed to create popup:', error.message);
    }
  };

  const handleDeletePopup = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://mernappbackend-iui9.onrender.com/Form/${formId}/Popup/${id}`, {
        method: 'DELETE',
        headers: {
          'x-auth-token': token,
        },
      });
      const result = await response.json();

      if (response.ok) {
        const popupToDelete = popups.find(popup => popup.id === id);
        if (popupToDelete) {
          const updatedPopups = popups.filter(popup => popup.id !== id);

          const updatedCategoryPopups = updatedPopups
            .filter(popup => popup.type === popupToDelete.type)
            .map((popup, index) => ({ ...popup, serialNo: index + 1 }));

          const mergedPopups = updatedPopups.map(popup =>
            popup.type === popupToDelete.type
              ? updatedCategoryPopups.shift()
              : popup
          );

          setPopups(mergedPopups);

          setCounters(prevCounters => ({
            ...prevCounters,
            [popupToDelete.type]: popupToDelete.serialNo,
          }));
        }
      } else {
        console.error('Failed to delete popup:', result.msg);
      }
    } catch (error) {
      console.error('Error deleting popup:', error);
    }
  };

  const handleContentChange = async (id, content) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://mernappbackend-iui9.onrender.com/Form/${formId}/Popup/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setPopups(popups.map(popup =>
        popup.id === id ? { ...popup, content } : popup
      ));
    } catch (error) {
      console.error('Error updating popup content:', error.message);
    }
  };

  const handleCancelClick = () => {
    navigate('/FormDashboard');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formName.trim()) {
      alert('Form name cannot be empty');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('User is not authenticated. Please log in.');
      return;
    }

    try {
      const response = await fetch('https://mernappbackend-iui9.onrender.com/Form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({ name: formName, folderId }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Form saved:', data);
        setFormName('');
        setIsShareButtonActive(true);
        navigate('/FormDashboard');
      } else {
        const errorData = await response.json();
        if (errorData.msg === 'A form with this name already exists in the selected folder') {
          alert('A form with this name already exists in the selected folder');
        } else {
          console.error('Failed to save form:', errorData);
          alert('Failed to save form. Please check the console for details.');
        }
      }
    } catch (error) {
      console.error('Error saving form:', error);
      alert('An error occurred. Please check the console for details.');
    }
  };

  const handleSwitchMode = (newMode) => {
    const targetMode = mode === 'theme' ? 'default' : newMode;
    setMode(targetMode);
    localStorage.setItem('mode', targetMode);
  };

  const handleSelectTheme = (theme) => {
    setSelectedTheme(theme);
    localStorage.setItem('selectedTheme', theme);
  };

  const getBackgroundColor = () => {
    if (!selectedTheme) return 'white';

    switch (selectedTheme) {
      case theme1:
        return 'white';
      case theme2:
        return '#18171C';
      case theme3:
        return '#508C9B';
      default:
        return 'white';
    }
  };

  const handleSaveForm = async () => {
    if (!formId) {
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('User is not authenticated. Please log in.');
      return;
    }

    try {
      const response = await fetch(`https://mernappbackend-iui9.onrender.com/Form/${formId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({ popups }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Form updated:', data);
        alert('Form saved successfully.');
        setIsShareButtonActive(true);
      } else {
        const errorData = await response.json();
        console.error('Failed to save form:', errorData);
        alert('Failed to save form. Please check the console for details.');
      }
    } catch (error) {
      console.error('Error saving form:', error);
      alert('An error occurred. Please check the console for details.');
    }
  };

  const handleShare = async () => {
    try {
      const response = await fetch('https://mernappbackend-iui9.onrender.com/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ popups, theme: selectedTheme }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.chatId) {
        throw new Error('Invalid response data: chatId is missing');
      }

      setChatId(data.chatId);
      const shareURL = `${window.location.origin}/ChatView?id=${data.chatId}&theme=${encodeURIComponent(selectedTheme)}`;
      await navigator.clipboard.writeText(shareURL);

      setPopupMessage('Link copied!');
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    } catch (err) {
      console.error('Failed to share:', err);
      alert('Failed to share. Please try again.');
    }
  };

  const handleResponseClick = () => {
    if (chatId) {
      navigate(`/FormResponse/${chatId}`);
    } else {
     alert('Share the form first');
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <form className={styles.headerForm} onSubmit={handleSubmit}>
          {mode === 'default' && (
            <input
              type="text"
              placeholder="Enter Form Name"
              className={styles.inputField}
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              required
            />
          )}
          <div className={styles.button}>
            <button type="button" className={styles.btn}>Flow</button>
            <button
              type="button"
              className={`${styles.btn} ${mode === 'theme' ? styles.highlight : ''}`}
              onClick={() => handleSwitchMode('theme')}
            >Theme</button>
            <button type="button" className={styles.btn}
              onClick={handleResponseClick}>Response</button>
          </div>
          <div className={styles.button}>
            <button
              type="button"
              className={`${styles.btn2} ${styles.btn2share} ${isShareButtonActive ? styles.btn2shareActive : ''}`}
              onClick={handleShare}
              disabled={!isShareButtonActive}
            >Share</button>
            <button type="submit" className={`${styles.btn2} ${styles.btn2save}`} onClick={handleSaveForm}>Save</button>
            <button type="button" className={`${styles.btn2} ${styles.btn2cancel}`} onClick={handleCancelClick}><FiX className={styles.icon} /></button>
          </div>
        </form>
        {showPopup && (
          <div className={styles.popup}>
            <FiCheck className={styles.checkIcon} />
            <p>{popupMessage}</p>
          </div>
        )}
      </header>

      <div className={styles.mainContent} style={{ backgroundColor: getBackgroundColor() }}>
        <Sidebar
          onAddPopup={handleAddPopup}
          mode={mode}
          onSwitchMode={handleSwitchMode}
          onSelectTheme={handleSelectTheme}
        />
        <div className={styles.content}>
          <button className={styles.inputButtonmiddle}> <BiSolidFlagAlt/>Start</button>
          {mode === 'theme' && selectedTheme && (
            <img src={selectedTheme} alt="Selected Theme" className={styles.themeImg} />
          )}

          {mode === 'default' && popups.map(popup => (
            <Popup
              key={popup.id}
              id={popup.id}
              type={popup.type}
              content={popup.content}
              serialNo={popup.serialNo}
              onDelete={handleDeletePopup}
              onContentChange={handleContentChange}
            />
          ))}
        
        </div>
      </div>
    </div>
  );
};

export default Workspace;
