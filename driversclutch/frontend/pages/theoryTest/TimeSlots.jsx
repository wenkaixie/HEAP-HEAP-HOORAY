import React from 'react';

import dayjs from 'dayjs';

const TimeSlots = ({ timeslots, selectedDate, handleAddBooking, selectedTimeslot }) => {
  const isPastDate = selectedDate.isBefore(dayjs(), 'day');  return (
    <div>
      {timeslots.length === 0 ? (
        <div>No available timeslots.</div>
      ) : (
        <div className='times'>
          {timeslots.map((slot, index) => (
              <button
                key ={index}
                className={`time-button ${!slot.available || isPastDate ? 'disabled' : ''}`}
                onClick={() => slot.available && !isPastDate && handleAddBooking(slot)}
                style={{ backgroundColor: selectedTimeslot === slot.time ? 'rgb(165, 165, 165)' : '' }}
                disabled={!slot.available || isPastDate}
              >
                {slot.time}
              </button>
            
          ))}
        </div>
      )}
    </div>
  );
};

export default TimeSlots;
