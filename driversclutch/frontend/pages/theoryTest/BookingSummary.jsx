"use client"
import React from 'react';
import dayjs from 'dayjs';

const BookingSummary = ({ selectedDate, selectedTimeslot, handleCancelBooking, handleNextStep, price }) => {
  return (
    <div className="booking-summary">
      {selectedTimeslot && (
        <div className='container'>
          <div className="booking-item">
            Theory Test<br /><br />
            {selectedDate.format('DD MMMM YYYY')} <br />
            {selectedTimeslot} <br />
            <div className='price'>${price}</div> 
          </div>
        </div>
      )}

      {selectedTimeslot && (
        <button
          className="next-button"
          onClick={handleNextStep}
        >Proceed to payment</button>
      )}
    </div>
  );
};

export default BookingSummary;
