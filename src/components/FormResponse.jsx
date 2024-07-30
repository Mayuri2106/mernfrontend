import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './FormResponse.module.css';
import { FiX } from 'react-icons/fi';

const FormResponse = () => {
  const { id } = useParams(); // Retrieve chat ID from URL parameters
  const navigate = useNavigate(); 
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://mernapp-v7s9.onrender.com/formresponse/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('Fetched Data:', result); 
        setData(result);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data || !data.responses || data.responses.length === 0) return (
    <div className={styles.noResponseContainer}>
      No response found
    </div>
  );

  const filteredResponses = data.responses.filter(response => response.response !== null && response.response !== undefined);

  
  const popupTypes = Array.from(new Set(filteredResponses.map(response => response.popupType)));

  const responsesByDate = filteredResponses.reduce((acc, response) => {
    if (!acc[response.submittedAt]) {
      acc[response.submittedAt] = {};
    }
    acc[response.submittedAt][response.popupType] = response.response;
    return acc;
  }, {});

  let completedInteractions = 0;
  let incompleteInteractions = 0;

  Object.values(responsesByDate).forEach(responsesForDate => {
    const hasAnyResponse = Object.keys(responsesForDate).length > 0;
    const hasAllResponses = popupTypes.every(type => responsesForDate[type] !== undefined);
    
    if (hasAnyResponse) {
      if (hasAllResponses) {
        completedInteractions++;
      } else {
        incompleteInteractions++;
      }
    }
  });

  const totalInteractions = completedInteractions + incompleteInteractions;

  
  const completionRate = totalInteractions > 0 ? (completedInteractions / totalInteractions) * 100 : 0;

  const handleFlowClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <form className={styles.headerForm}>
          <div className={styles.button}>
            <button type="button" className={styles.btn} onClick={handleFlowClick}>
              Flow
            </button>
            <button type="button" className={styles.btn}>
              Theme
            </button>
            <button type="button" className={styles.btn}>
              Response
            </button>
          </div>
          <div className={styles.button}>
            <button type="button" className={`${styles.btn2} ${styles.btn2share}`}>
              Share
            </button>
            <button type="submit" className={`${styles.btn2} ${styles.btn2save}`}>
              Save
            </button>
            <button type="button" className={`${styles.btn2} ${styles.btn2cancel}`}>
              <FiX className={styles.icon} />
            </button>
          </div>
        </form>
      </header>

      <div className={styles.summaryContainer}>
        <div className={styles.summary}>
          <div className={styles.box}>
            <h3>Views</h3>
            <p>{data.views}</p>
          </div>
          <div className={styles.box}>
            <h3>Incomplete Interactions</h3>
            <p>{incompleteInteractions}</p>
          </div>
          <div className={styles.box}>
            <h3>Completion Rate</h3>
            <p>{completionRate.toFixed(2)}%</p>
          </div>
        </div>
      </div>

      {filteredResponses.length === 0 ? (
        <div className={styles.noResponseContainer}>
          No response found
        </div>
      ) : (
        <div className={styles.tablecontainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Submitted At</th>
                {popupTypes.map((type, index) => (
                  <th key={index}>{type}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(responsesByDate).map(([submittedAt, responses], index) => (
                <tr key={index}>
                  <td>{new Date(submittedAt).toLocaleString()}</td>
                  {popupTypes.map((type, index) => (
                    <td key={index}>
                      {responses[type] !== undefined ? responses[type].toString() : ''}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FormResponse;
