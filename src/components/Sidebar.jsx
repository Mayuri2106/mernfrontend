import React from 'react';
import { FiImage, FiFilm, FiFileText, FiPhone , FiCalendar, FiStar , FiHash } from 'react-icons/fi';
import { AiOutlineGif } from "react-icons/ai";
import { PiTextTBold } from "react-icons/pi";
import { MdAlternateEmail } from "react-icons/md";
import { TfiCheckBox } from "react-icons/tfi";
import styles from './Workspace.module.css';
import Theme1 from '../assets/lightTheme.png';
import Theme2 from '../assets/darkTheme.png';
import Theme3 from '../assets/blueTheme.png';
import theme1 from '../assets/lightImg.png';
import theme2 from '../assets/darkImg.png';
import theme3 from '../assets/blueImg.png';

const Sidebar = ({ onAddPopup,  mode, onSelectTheme }) => {
  const renderDefaultMode = () => (
    <div>
      <h2>Bubbles</h2>
      <div className={styles.bubbleButtons}>
        <button className={styles.bubbleButton} onClick={() => onAddPopup('Text')}>
          <FiFileText className={styles.icon2} /> Text
        </button>
        <button className={styles.bubbleButton} onClick={() => onAddPopup('Image')}>
          <FiImage className={styles.icon2} /> Image
        </button>
        <button className={styles.bubbleButton} onClick={() => onAddPopup('Video')}>
          <FiFilm className={styles.icon2} /> Video
        </button>
        <button className={styles.bubbleButton} onClick={() => onAddPopup('GIF')}>
          <AiOutlineGif className={styles.icon2} /> GIF
        </button>
      </div>
      <h2>Inputs</h2>
      <div className={styles.inputButtons}>
        <button className={styles.inputButton} onClick={() => onAddPopup('TextInput')}>
          <PiTextTBold className={styles.icon3} /> Text
        </button>
        <button className={styles.inputButton} onClick={() => onAddPopup('NumberInput')}>
          <FiHash  className={styles.icon3} /> Number
        </button>
        <button className={styles.inputButton} onClick={() => onAddPopup('EmailInput')}>
          <MdAlternateEmail className={styles.icon3} /> Email
        </button>
        <button className={styles.inputButton} onClick={() => onAddPopup('PhoneInput')}>
          <FiPhone  className={styles.icon3} /> Phone
        </button>
        <button className={styles.inputButton} onClick={() => onAddPopup('DateInput')}>
          <FiCalendar className={styles.icon3} /> Date
        </button>
        <button className={styles.inputButton} onClick={() => onAddPopup('RatingInput')}>
          <FiStar  className={styles.icon3} /> Rating
        </button>
        <button className={styles.inputButton} onClick={() => onAddPopup('ButtonsInput')}>
          <TfiCheckBox className={styles.icon3} /> Buttons
        </button>
      </div>
    </div>
  );

  const renderThemeMode = () => (
    <div>
      <h2>Customize Your Theme</h2>
      <img src={Theme1} alt="Theme 1" className={styles.themeImage} onClick={() => onSelectTheme(theme1)} />
      <img src={Theme2} alt="Theme 2" className={styles.themeImage} onClick={() => onSelectTheme(theme2)} />
      <img src={Theme3} alt="Theme 3" className={styles.themeImage} onClick={() => onSelectTheme(theme3)} />
    </div>
  );

  return (
    <aside className={styles.verticalBox}>
      {mode === 'default' ? renderDefaultMode() : renderThemeMode()}
    </aside>
  );
};

export default Sidebar;
