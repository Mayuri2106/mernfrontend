
import React from 'react';
import { LuFolderPlus } from 'react-icons/lu';
import styles from './FolderButton.module.css';

const FolderButton = ({ onClick }) => {
  return (
    <div className={styles.folderContainer }>
    <button className={styles.createButton} onClick={onClick}>
      <LuFolderPlus /> Create Folder
    </button>
    </div>
  );
};

export default FolderButton;
