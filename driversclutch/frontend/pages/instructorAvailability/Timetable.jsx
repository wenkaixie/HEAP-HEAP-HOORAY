"use client";
import React, { useState, useEffect } from 'react';
import {FirestoreDB, auth} from '../../src/app/firebase/firebase_config';
import { getDoc, doc } from 'firebase/firestore';import './page.css';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const TimeTable = ({ selectedDate, availability, handleAvailabilityChange, handleSelectAllChange, handleConfirm }) => {
  const [workStart, setWorkStart] = useState(null);
  const [workEnd, setWorkEnd] = useState(null);
  const [duration, setDuration] = useState(null);
  const [times, setTimes] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const documentId = localStorage.getItem('userDocID');
  useEffect(() => {
    const fetchWorkTimes = async () => {
      if (!documentId) return;

      try {
        const docRef = doc(FirestoreDB, 'instructors', documentId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setWorkStart(data.workStart);
          setWorkEnd(data.workEnd);
          setDuration(data.lessonDuration);
        }
      } catch (error) {
        console.error('Error fetching work times:', error);
      }
    };

    fetchWorkTimes();
    console.log(workStart, workEnd, duration);
  }, [documentId]);

  // useEffect(() => {
  //   if (workStart !== null && workEnd !== null) {
  //     const start = dayjs().startOf('day').add(workStart, 'hour');
  //     const end = dayjs().startOf('day').add(workEnd, 'hour');
  //     const generatedTimes = [];
  //     let currentTime = start;
  //     while (currentTime.isBefore(end) || currentTime.isSame(end)) {
  //       generatedTimes.push(currentTime.format('hh:mm A'));
  //       currentTime = currentTime.add(duration, 'hour');
  //     }

  //     setTimes(generatedTimes);
  //   }
  // }, [workStart, workEnd]);

  useEffect(() => {
    if (workStart !== null && workEnd !== null) {
      const start = dayjs(workStart, 'hh:mm A');
      const end = dayjs(workEnd, 'hh:mm A');
      const generatedTimes = [];
      let currentTime = start;
      while (currentTime.isBefore(end) || currentTime.isSame(end)) {
        generatedTimes.push(currentTime.format('hh:mm A'));
        currentTime = currentTime.add(duration, 'hour');
      }
  
      setTimes(generatedTimes);
    }
  }, [workStart, workEnd]);
  

  useEffect(() => {
    const dateKey = selectedDate.format('YYYY-MM-DD');
    const selectedTimes = availability[dateKey] || [];
    
    setIsAllSelected(selectedTimes.length === times.length);
  }, [selectedDate, availability, times]);

  const handleSelectAllChangeInternal = (e) => {
    const isChecked = e.target.checked;
    handleSelectAllChange(selectedDate, times, isChecked);
  };

  if (workStart === null || workEnd === null) {
    return <div>Loading...</div>; // Show a loading state until times are fetched
  }

  return (
    <div className="time-table">
      <div className="select-all">
        <input
          type="checkbox"
          id="select-all"
          onChange={handleSelectAllChangeInternal}
          checked={isAllSelected}
        />
        <label htmlFor='select-all'>Select All</label>
      </div>
      
      <div className="time-slots">
        {times.map((time, index) => (
          <button
            key={index}
            className={`time-slot ${availability[selectedDate.format('YYYY-MM-DD')]?.includes(time) ? 'selected' : ''}`}
            onClick={() => handleAvailabilityChange(selectedDate, time)}
          >
            {time}
          </button>
        ))}
      </div>
      <div className="confirm-button">
        <button onClick={handleConfirm}>Confirm</button>
      </div>
    </div>
  );
};

export default TimeTable;
