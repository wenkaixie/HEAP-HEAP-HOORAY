// // BookingSummary.jsx
// import React from 'react';

// const BookingSummary = ({ bookings, handleCancelBooking }) => {
//     return (
//         <div className="booking-summary">
//             <div className='title'>
//                 <p>Booking Summary</p>
//             </div>

//             {bookings.map((booking, index) => (
//                 <div className='container'>
//                     <div key={index} className="booking-item">
//                     <p>{booking.date} - {booking.time}</p>
//                     <button onClick={() => handleCancelBooking(index)}>Cancel</button>
//                 </div>
//                 </div>
                
//             ))}
//         </div>
//     );
// };

// export default BookingSummary;
import React from 'react';

const BookingSummary = ({ bookings, handleCancelBooking, handleNextStep, hasClashes }) => {
  return (
    <div className="booking-summary">
      <div className='title'>
        <p>Booking Summary</p>
      </div>

      {bookings.map((booking, index) => (
        <div key={index} className='container'>
          <button 
            className="cancel-button" 
            onClick={() => handleCancelBooking(index)}
          >
            Cancel
          </button>
          <div className="booking-item">
            <p>{booking.lesson}</p>
            <p>{booking.date}</p>
            <p>{booking.time} - {booking.endTime}</p>
          </div>
        </div>
      ))}

      {hasClashes && <p className="error-message">Make sure all bookings do not clash</p>}

      {bookings.length > 0 && (
        <input type="submit" value="Next" 
          className={`next-button ${hasClashes ? 'disabled' : ''}`}
          onClick={handleNextStep}
          disabled={hasClashes}
        />
      )}
    </div>
  );
};

export default BookingSummary;