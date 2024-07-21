"use client";
import React from 'react';
import dayjs from 'dayjs';

const BookingSummary = ({ selectedDate, selectedTimeslot, handleNextStep, price, creditBalance, totalPrice }) => {
  console.log('Selected Date:', selectedDate);
  console.log('Selected Timeslot:', selectedTimeslot);

  const slotNumber = selectedTimeslot ? selectedTimeslot.split(' ')[1] : ''; // Extract slot number
  const startTime = selectedTimeslot ? selectedTimeslot.split(' ')[2] : ''; // Extract start time
  const formattedStartTime = startTime ? dayjs(startTime, 'HH:mm').format('h:mm A') : ''; // Format start time with uppercase AM/PM
  const endTime = startTime ? dayjs(startTime, 'HH:mm').add(45, 'minute').format('h:mm A') : ''; // Calculate and format end time with uppercase AM/PM

  return (
    <div className="booking-summary">
      {selectedTimeslot && selectedDate && (
        <div className='container'>
          <div className="booking-item">
            Theory Test Session {slotNumber}<br /><br />
            {selectedDate.format('DD MMMM YYYY')} <br />
            {formattedStartTime} - {endTime} <br />
            <div className='price'>${price}</div> 
          </div>
        </div>
      )}

      {selectedTimeslot && (
        <>
          <p>Credits Left: ${creditBalance}</p>
          {creditBalance < totalPrice && (
            <div className="insufficient-credits">
              Insufficient credits. Click <a href="./balance">here</a> to top up.
            </div>
          )}
          <div className="pay-btn">
            <button
              className="next-button"
              onClick={handleNextStep}
              disabled={creditBalance < totalPrice}
            >Pay</button>
          </div>
        </>
      )}
    </div>
  );
};

export default BookingSummary;
