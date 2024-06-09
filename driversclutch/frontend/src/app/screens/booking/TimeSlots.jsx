"use client";
// TimeSlots.jsx
import React from 'react';
import dayjs from 'dayjs';

const TimeSlots = ({ timeslots, selectedDate, handleAddBooking }) => {
  const isPastDate = selectedDate.isBefore(dayjs(), 'day');

  return (
    <div className="time-selector">
      <p>Time Slots Available</p>
      <div className="times">
        {timeslots.map((slot, index) => (
          <button
            key={index}
            className={`time-button ${!slot.available || isPastDate ? 'disabled' : ''}`}
            onClick={() => slot.available && !isPastDate && handleAddBooking(slot.time)}
            disabled={!slot.available || isPastDate}
          >
            {slot.time}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSlots;
