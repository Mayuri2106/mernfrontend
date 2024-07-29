import React , {useState, useEffect} from 'react';

import { FaTrashAlt } from 'react-icons/fa';
import styles from './Popup.module.css';

const Popup = ({ id, type, content, serialNo, category, onDelete, onContentChange }) => {

  const [value, setValue] = useState(content);
  const [error, setError] = useState('');

  const getPlaceholder = () => {
    switch (type) {
      case 'Text':
        return 'Enter your text';
      case 'Image':
      case 'Video':
      case 'GIF':
        return `Click to add link for ${type.toLowerCase()}`;
      case 'TextInput':
        return 'Hint: User will input a text on his form';
      case 'NumberInput':
        return 'Hint: User will enter a number on his form';
      case 'EmailInput':
        return 'Hint: User will input an email on his form';
    case 'RatingInput':
        return 'Hint: User will tap to rate out of 5'
      case 'PhoneInput':
        return 'Hint: User will input a phone number on his form';
      case 'DateInput':
        return 'Hint: User will select a date';
      case 'ButtonInput':
        return 'Enter text for button';
      default:
        return '';
    }
  };




  const validate = () => {
    let isValid = true;
    if (['Text', 'Image', 'Video', 'GIF', 'ButtonsInput'].includes(type)) {
      if (!value.trim()) {
        setError('This field is required');
        isValid = false;
      } else {
        setError('');
      }
    }
    return isValid;
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    setError('');
  
    if (validate()) {
      onContentChange(id, newValue, category);
    }
  };


  useEffect(() => {

    validate();
  }, [value]);
 




  
  return (

    
    <div className={styles.popup}>
        
      
      <div className={styles.popupHeader}>
      <h1 className={styles.serialNo}>{type} {serialNo}</h1>
        <button className={styles.closeButton} onClick={() => onDelete(id, category)}>
          <FaTrashAlt />
        </button>
      </div>
     {['TextInput', 'NumberInput', 'EmailInput', 'PhoneInput', 'RatingInput', 'DateInput', 'ButtonInput'].includes(type) ? (
        <div className={styles.textareaPlaceholder}>{getPlaceholder()}</div>
      ) : (
        <input
          placeholder={getPlaceholder()}
          value={content}
          onChange={handleChange}
          className={`${styles.textarea} ${error ? styles.errorBorder : ''}`}
          
        />

      )}
      
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};
export default Popup;
