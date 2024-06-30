import React from 'react';

const BookingSummary = ({ bookings, handleCancelBooking, handleNextStep, hasClashes }) => {
  return (
    <div className="booking-summary">
      <div className='title'>
        <p>Booking Summary</p>
      </div>

      {bookings.map((booking, index) => (
        <div key={index} className='container'>
          <div className="booking-item">
            {booking.lesson}<br /><br />
            {booking.date} <br />
            {booking.time} - {booking.endTime}
          </div>
          <button 
            className="cancel-button" 
            onClick={() => handleCancelBooking(index)}
          >
            Cancel
          </button>
        </div>
      ))}

      {hasClashes && <p className="error-message">Ensure there are no overlapping bookings!</p>}

      {bookings.length > 0 && (
        <button
          className={`next-button ${hasClashes ? 'disabled' : ''}`}
          onClick={handleNextStep}
          disabled={hasClashes}
        >Proceed to payment</button>
      )}
    </div>
  );
};

export default BookingSummary;

