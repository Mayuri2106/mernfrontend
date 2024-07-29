// components/ChatView.js
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TbArrowBadgeRight } from "react-icons/tb";
import { useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './ChatView.module.css';
import img from '../assets/img18.png';

import theme1 from '../assets/lightImg.png'; 
import theme2 from '../assets/darkImg.png'; 
import theme3 from '../assets/blueImg.png';   

const ChatView = () => {
  const [searchParams] = useSearchParams();
  const [popups, setPopups] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [inputStates, setInputStates] = useState({});
  const [waitingForInput, setWaitingForInput] = useState(false);
  const location = useLocation();
  const [backgroundColor, setBackgroundColor] = useState('white');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const theme = queryParams.get('theme');

    const getBackgroundColor = (theme) => {
      switch (theme) {
        case theme1:
          return 'white';   // Light theme
        case theme2:
          return '#18171C'; // Dark theme
        case theme3:
          return '#508C9B'; // Blue theme
        default:
          return 'white';   // Default to white if no match
      }
    };

    if (theme) {
      setBackgroundColor(getBackgroundColor(theme));
    }
  }, [location.search]);






  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      fetch(`https://mernappbackend-iui9.onrender.com/chat/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log('Fetched data:', data);
          if (data && Array.isArray(data.popups)) {
            setPopups(data.popups);
            setInputStates(
              data.popups.reduce((acc, popup, index) => {
                if (['TextInput', 'EmailInput', 'NumberInput', 'PhoneInput'].includes(popup.type)) {
                  acc[index] = { value: '', sent: false };
                } else if (popup.type === 'ButtonsInput') {
                  acc[index] = { clicked: false };
                } else if (popup.type === 'RatingInput') {
                  acc[index] = { selectedRating: null, sent: false };
                } else if (popup.type === 'DateInput') {
                  acc[index] = { date: null, sent: false };
                }
                return acc;
              }, {})
            );
            setCurrentStep(0);
            setWaitingForInput(false);
          } else {
            console.error('Invalid or missing popups data:', data);
          }
        })
        .catch((err) => console.error('Failed to fetch chat:', err));
    }
  }, [searchParams]);

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      fetch(`https://mernappbackend-iui9.onrender.com/chat/${id}/interact`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          views: 1,
          incompleteInteractions: 0,  
          completionRate: 0,         
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log('Chat interaction updated:', data);
        })
        .catch((err) => {
          console.error('Update interaction error:', err);
        });
    }
  }, [searchParams]);

  useEffect(() => {
    if (!waitingForInput && popups.length > 0 && currentStep < popups.length) {
      const currentPopup = popups[currentStep];

      if (['TextInput', 'EmailInput', 'NumberInput', 'PhoneInput', 'RatingInput', 'DateInput','ButtonsInput'].includes(currentPopup.type)) {
        setWaitingForInput(true);
      } else {
        const timer = setTimeout(() => {
          setCurrentStep((prevStep) => (prevStep < popups.length - 1 ? prevStep + 1 : prevStep));
        }, 2000);

        return () => clearTimeout(timer);
      }
    }
  }, [waitingForInput, currentStep, popups]);

  const handleSend = (index) => {
    const popup = popups[index];
    const chatId = searchParams.get('id');
    const response = inputStates[index]?.value || inputStates[index]?.date?.toISOString() || inputStates[index]?.selectedRating || (inputStates[index]?.clicked ? 'clicked' : '');

    console.log('Sending interaction:', {
      popupIndex: index,
      interactionType: popup.type,
      value: response,
    });

    fetch(`https://mernappbackend-iui9.onrender.com/chat/${chatId}/response`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ index, response }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Response saved:', data);
        setInputStates((prevState) => ({
          ...prevState,
          [index]: { ...prevState[index], sent: true },
        }));
        setWaitingForInput(false);
        if (currentStep < popups.length - 1) {
          setCurrentStep((prevStep) => prevStep + 1);
        }
      })
      .catch((err) => {
        console.error('Failed to save response:', err);
      });
  };

  const handleChange = (e, index) => {
    setInputStates((prevState) => ({
      ...prevState,
      [index]: { ...prevState[index], value: e.target.value },
    }));
  };

  const handleButtonClick = (index) => {
    setInputStates((prevState) => ({
      ...prevState,
      [index]: { clicked: true },
    }));
    handleSend(index);
  };

  const handleRatingClick = (index, rating) => {
    setInputStates((prevState) => ({
      ...prevState,
      [index]: { ...prevState[index], selectedRating: rating },
    }));
  };

  const handleRatingSend = (index) => {
    setInputStates((prevState) => ({
      ...prevState,
      [index]: { ...prevState[index], sent: true },
    }));
    setWaitingForInput(false);
    handleSend(index);
  };

  const handleDateChange = (date, index) => {
    setInputStates((prevState) => ({
      ...prevState,
      [index]: { ...prevState[index], date },
    }));
  };

  const handleDateSend = (index) => {
    setInputStates((prevState) => ({
      ...prevState,
      [index]: { ...prevState[index], sent: true },
    }));
    setWaitingForInput(false);
    handleSend(index);
  };

  const isValidURL = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const shouldShowImage = (index) => {
    const currentPopupType = popups[index].type;
    const nextPopup = popups[index + 1];
    const isLastInSequence = ['Text', 'Image', 'Video', 'GIF'].includes(currentPopupType) &&
               (nextPopup === undefined || !['Text', 'Image', 'Video', 'GIF'].includes(nextPopup.type));

    return isLastInSequence ;
  };

  return (
    <div className={styles.chatViewContainer} style={{ backgroundColor }}>
          <div className={styles.chatMessages}>
        {popups.map((popup, index) => (
          <div
            key={index}
            className={
              popup.type === 'Text' ||
              popup.type === 'Image' ||
              popup.type === 'Video' ||
              popup.type === 'GIF'
                ? styles.leftAlign
                : styles.rightAlign
            }
            style={{ display: index <= currentStep ? 'block' : 'none' }}
          >
            {shouldShowImage(index) && (
                <img src={img} alt="Popup content preview" className={styles.shouldShowImage}/>
            )}
            {popup.type === 'TextInput' ||
            popup.type === 'EmailInput' ||
            popup.type === 'NumberInput' ||
            popup.type === 'PhoneInput' ? (
              <div className={styles.textInputWrapper}>
                {inputStates[index]?.sent ? (
                  <div className={styles.disabledText}>{inputStates[index]?.value}</div>
                ) : (
                  <div className={styles.inputContainer}>
                    <input
                      type={
                        popup.type === 'EmailInput'
                          ? 'email'
                          : popup.type === 'NumberInput'
                          ? 'number'
                          : 'text'
                      }
                      placeholder={`Enter your ${popup.type.replace('Input', '').toLowerCase()}`}
                      value={inputStates[index]?.value}
                      onChange={(e) => handleChange(e, index)}
                      className={styles.textInput}
                    />
                    <TbArrowBadgeRight
                      className={`${styles.sendIcon} ${inputStates[index]?.sent ? styles.disabled : ''}`}
                      onClick={() => handleSend(index)}
                    />
                  </div>
                )}
              </div>
            ) : popup.type === 'ButtonsInput' ? (
              <div
                className={`${styles.buttonBox} ${
                  inputStates[index]?.clicked ? styles.clickedButton : styles.unclickedButton
                }`}
                onClick={() => handleButtonClick(index)}
              >
                {popup.content}
              </div>
            ) : popup.type === 'RatingInput' ? (
              <div className={styles.ratingWrapper}>
                <div className={styles.ratingContainer}>
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      className={`${styles.ratingButton} ${
                        inputStates[index]?.selectedRating === rating
                          ? styles.selectedRating
                          : ''
                      } ${inputStates[index]?.sent ? styles.disabledRating : ''}`}
                      onClick={() => handleRatingClick(index, rating)}
                      disabled={inputStates[index]?.sent}
                    >
                      {rating}
                    </button>
                  ))}
                </div>
                {!inputStates[index]?.sent && (
                  <TbArrowBadgeRight
                    className={styles.sendIcon}
                    onClick={() => handleRatingSend(index)}
                  />
                )}
              </div>
            ) : popup.type === 'DateInput' ? (
              <div className={styles.dateInputWrapper}>
                {inputStates[index]?.sent ? (
                  <div className={styles.disabledText}>
                    {inputStates[index]?.date?.toLocaleDateString()}
                  </div>
                ) : (
                  <div className={styles.dateInputContainer}>
                    <DatePicker
                      selected={inputStates[index]?.date}
                      onChange={(date) => handleDateChange(date, index)}
                      placeholderText="Select a date"
                      className={styles.dateInput}
                    />
                    <TbArrowBadgeRight
                      className={styles.sendIcon}
                      onClick={() => handleDateSend(index)}
                    />
                  </div>
                )}
              </div>
            ) : popup.type === 'Image' && isValidURL(popup.content) ? (
              <img src={popup.content} alt="Popup content" className={styles.mediaContent} />
            ) : popup.type === 'Video' && isValidURL(popup.content) ? (
              <video src={popup.content} controls className={styles.mediaContent} />
            ) : popup.type === 'GIF' && isValidURL(popup.content) ? (
              <img src={popup.content} alt="Popup content" className={styles.mediaContent} />
            ) : (
              popup.content
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatView;
