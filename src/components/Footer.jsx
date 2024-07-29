import React from 'react';
import styles from './Footer.module.css'; 
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.column}>
        <p>Made with ❤️ by <a href="https://github.com/cuvette" className={styles.link}>@cuvette</a></p>
      </div>
      <div className={styles.column}>
        <ul className={styles.list}>
          <li className={styles.listItem}><a href="#status" className={styles.link}>Status <FaArrowUpRightFromSquare /></a></li>
          <li className={styles.listItem}><a href="#documentation" className={styles.link}>Documentation <FaArrowUpRightFromSquare /></a></li>
          <li className={styles.listItem}><a href="#roadmap" className={styles.link}>Roadmap <FaArrowUpRightFromSquare /></a></li>
          <li className={styles.listItem}><a href="#pricing" className={styles.link}>Pricing </a></li>
        </ul>
      </div>
      <div className={styles.column}>
        <ul className={styles.list}>
          <li className={styles.listItem}><a href="https://discord.com" className={styles.link}>Discord <FaArrowUpRightFromSquare /></a></li>
          <li className={styles.listItem}><a href="https://github.com" className={styles.link}>GitHub Repository <FaArrowUpRightFromSquare /></a></li>
          <li className={styles.listItem}><a href="https://twitter.com" className={styles.link}>Twitter <FaArrowUpRightFromSquare /></a></li>
          <li className={styles.listItem}><a href="https://linkedin.com" className={styles.link}>LinkedIn <FaArrowUpRightFromSquare /></a></li>
          <li className={styles.listItem}><a href="#oss-friends" className={styles.link}>OSS Friends </a></li>
        </ul>
      </div>
      <div className={styles.column}>
        <ul className={styles.list}>
          <li className={styles.listItem}><a href="#about" className={styles.link}>About </a></li>
          <li className={styles.listItem}><a href="#contact" className={styles.link}>Contact </a></li>
          <li className={styles.listItem}><a href="#terms-of-service" className={styles.link}>Terms of Service </a></li>
          <li className={styles.listItem}><a href="#privacy-policy" className={styles.link}>Privacy Policy </a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
