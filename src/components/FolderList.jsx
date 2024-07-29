import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import ConfirmationPopup from './ConfirmationPopup';
import styles from './FolderList.module.css';

const FolderList = ({ folders, onDeleteFolder, onFolderClick, selectedFolderId }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [folderToDelete, setFolderToDelete] = useState(null);

  const handleDeleteClick = (folder) => {
    setFolderToDelete(folder);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    onDeleteFolder(folderToDelete._id);
    setShowConfirmation(false);
    setFolderToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setFolderToDelete(null);
  };

  return (
    <div className={styles.container}>
      {folders.map((folder) => (
        <div
          key={folder._id}
          className={`${styles.folderItem} ${selectedFolderId === folder._id ? styles.selected : ''}`}
        >
          <div
            className={styles.folderButton}
            onClick={() => onFolderClick(folder._id)}
          >
            {folder.name}
            <button
              className={styles.deleteButton}
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteClick(folder);
              }}
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>
      ))}
      {showConfirmation && (
        <ConfirmationPopup
          message="Are you sure you want to delete this folder?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default FolderList;
