"use client";
import React from 'react';
import dayjs from 'dayjs';

const BookingSummary = ({ selectedDate, selectedTimeslot, handleNextStep, price, creditBalance, totalPrice }) => {
  console.log('Selected Date:', selectedDate);
  console.log('Selected Timeslot:', selectedTimeslot);

  const startTime = dayjs(selectedTimeslot, 'HH:mm');
  const endTime = startTime.add(45, 'minute');

  console.log('Start Time:', startTime.format('HH:mm'));
  console.log('End Time:', endTime.format('HH:mm'));

  return (
    <div className="booking-summary">
      {selectedTimeslot && selectedDate && (
        <div className='container'>
          <div className="booking-item">
            Theory Test Session<br /><br />
            {selectedDate.format('DD MMMM YYYY')} <br />
            {selectedTimeslot} <br />
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
            >Proceed to payment</button>
          </div>
        </>
      )}
    </div>
  );
};

export default BookingSummary;
