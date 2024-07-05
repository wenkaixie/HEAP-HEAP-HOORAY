"use client";
import React, { useState, useEffect } from 'react';
import './page.css';
import dayjs from 'dayjs';

const TimeTable = ({ selectedDate, availability, handleAvailabilityChange, handleSelectAllChange, handleConfirm }) => {

  const startTime = dayjs().startOf('day').add(9, 'hour');
  const endTime = dayjs().startOf('day').add(20, 'hour');
  const times = [];

  let currentTime = startTime;
  while (currentTime.isBefore(endTime) || currentTime.isSame(endTime)) {
    times.push(currentTime.format('hh:mm A'));
    currentTime = currentTime.add(1, 'hour');
  }

  const dateKey = selectedDate.format('YYYY-MM-DD');
  const selectedTimes = availability[dateKey] || [];

  const [isAllSelected, setIsAllSelected] = useState(false);

  useEffect(() => {
    if (selectedTimes.length === times.length) {
      setIsAllSelected(true);
    } else {
      setIsAllSelected(false);
    }
  }, [selectedTimes, times]);

  const handleSelectAllChangeInternal = (e) => {
    const isChecked = e.target.checked;
    handleSelectAllChange(selectedDate, times, isChecked);
  };

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
            className={`time-slot ${selectedTimes.includes(time) ? 'selected' : ''}`}
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
