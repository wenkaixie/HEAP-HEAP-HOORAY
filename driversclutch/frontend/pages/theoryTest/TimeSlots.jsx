"use client";
import React from 'react';
import dayjs from 'dayjs';

const TimeSlots = ({ timeslots, selectedDate, handleAddBooking, loading }) => {
  const isPastDate = selectedDate ? selectedDate.isBefore(dayjs(), 'day') : false;

  return (
    <div className="time-selector">
      {loading ? (
        <p>Loading Available Timeslots...</p>
      ) : timeslots.length === 0 ? (
        <p>No available timeslots</p>
      ) : (
    <div className="time-selector">
      <div className="times">
        {timeslots.map((slot, index) => (
          <button
            key={index}
            className={`time-button ${isPastDate ? 'disabled' : ''}`}
            onClick={() => !isPastDate && handleAddBooking(slot)}
            style={{ backgroundColor: selectedDate === slot.time ? 'rgb(165, 165, 165)' : '' }}
            disabled={isPastDate}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
    )}
    </div>
  );
};

export default TimeSlots;
