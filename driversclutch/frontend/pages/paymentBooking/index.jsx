"use client";
import "./page.css";
import React, { useEffect, useState } from 'react';
import Navbar from '@/app/components/navbar/navbar';
import '@/app/components/background/background.css'
import '@/app/components/dashboard/dashboard.css';
import { GiCancel } from "react-icons/gi";
import { SiTicktick } from "react-icons/si";
import axios from 'axios'; 

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [creditBalance, setCreditBalance] = useState(100); // HARDCODED BALANCE! FETCH BALANCE FROM DATABASE!
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const pricePerLesson = 50; // HARDCODED PRICE! FETCH THE PRICE INDICATED BY INSTRUCTOR IN THE PROFILE PAGE FROM THE DATABASE!
  const numOfBookings = bookings.length;
  const totalPrice = numOfBookings * pricePerLesson;

  useEffect(() => {
    const storedBookings = localStorage.getItem('bookings');
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    }
  }, []);

  const userDocID = localStorage.getItem('userDocID');

//   const convertToRequiredFormat = (bookings) => {
//     const datetimes = [];
//     for (const [date, times] of Object.entries(bookings)) {
//       times.forEach(time => {
//         const datetime = dayjs(`${date} ${time}`, 'YYYY-MM-DD hh:mm A').toISOString();
//         datetimes.push(datetime);
//       });
//     }
//     return datetimes;
//   };

  console.log(bookings);

//   const updateDatabase = async () => {
//     const remainingBalance = creditBalance - totalPrice;
//     setCreditBalance(remainingBalance);
//     const bookingDetails = bookings.map(booking => {
//     const date = booking.date;
//     const time = booking.time;)
    

//     console.log(`Date: ${date}, Time: ${time}`);
//     const formattedData = convertToRequiredFormat(bookings);
//     try {
//         const requestData = {
//           studentID: userDocID,
//           timeslots: formattedData,
//           balance: creditBalance
//         };
    
//         console.log("Sending data to server:", requestData); 
    
//         const response = await axios.post('http://localhost:8001/students/booking/updateStudent', requestData, {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
    
//         if (response.status === 200) {
//           console.log("updatedBalance data successfully sent to the database.");
//         } else {
//           console.error("Failed to send updatedBalance data.");
//         }
//       } catch (error) {
//         console.error("Error:", error);
//         if (error.response) {
//           console.error("Server responded with:", error.response.data);
//         }
//       }
//     };

    const updateDatabase = async () => {
        // Convert booking date and time to ISO 8601 format
        const bookingDetails = bookings.map(booking => {
          const date = booking.date;
          const time = booking.time;
      
          console.log(`Date: ${date}, Time: ${time}`);
      
          // Validate date and time format
          const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(date);
          const isValidTime = /^\d{2}:\d{2}(:\d{2})?$/.test(time); // matches HH:MM or HH:MM:SS
      
          if (!isValidDate || !isValidTime) {
            console.error('Invalid date or time format:', { date, time });
            return null; // Or handle the error as needed
          }
      
          try {
            const dateTimeString = `${date}T${time}`;
            const isoDateTime = new Date(dateTimeString).toISOString();
            return {
              datetimes: isoDateTime,
            };
          } catch (error) {
            console.error(`Failed to create ISO string from date/time: ${dateTimeString}`, error);
            return null; // Or handle the error as needed
          }
        }).filter(detail => detail !== null); // Filter out invalid entries
      
        try {
          const requestData = {
            studentID: userDocID,
            timeslots: bookingDetails,
            balance: creditBalance
          };
      
          console.log("Sending data to server:", requestData);
      
          const response = await axios.post('http://localhost:8001/students/booking/updateStudent/', requestData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (response.status === 200) {
            console.log("bookingDetails data successfully sent to the database.");
            setIsPopupVisible(true);
          } else {
            console.error("Failed to send bookingDetails data.");
          }
        } catch (error) {
          console.error("Error:", error);
          if (error.response) {
            console.error("Server responded with:", error.response.data);
          }
        }
      };
      

  const handleClick = async () => {
    if (creditBalance >= totalPrice) {
    //   await updateBalance();
      await updateDatabase();
    }
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="dashboard">
      <div className="title">
        <h1>Payment Details</h1>
      </div>
      <div className="dashboard-container">
        <p>Booking Summary</p>

        <div className="booking-summary">
          {bookings.map((booking, index) => (
            <div key={index} className="container">
              <div className="booking-item">
                {booking.lesson}<br /><br />
                {booking.date} <br />
                {booking.time} - {booking.endTime}
                <div className="price">
                  ${pricePerLesson}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="dashboard-container">
        <p>Total Amount : ${totalPrice}</p>
        <p>Balance : ${creditBalance}</p>
        {creditBalance < totalPrice && (
          <div className="insufficient-credits">
            {/* update link for top up!!!! */}
            Insufficient credits. Click <a href="../../profile">here</a> to top up.
          </div>
        )}
        <div className="pay-btn">
          <button 
            onClick={handleClick}
            className={creditBalance < totalPrice ? 'disabled' : ''}
          >
            Pay
          </button>
        </div>
      </div>
      {isPopupVisible && (
        <div id="popupOverlay" className="popup-overlay show">
          <div className="popup-box">
            <strong>Payment Confirmed</strong>
            <GiCancel className='button' onClick={closePopup} />
            <br /><br /><SiTicktick className="tick"/>
          </div>
        </div>
      )}
    </div>
  );
};

const PaymentBooking = () => {
  return (
    <main>
      <div>
        <Navbar />
      </div>
      <Dashboard />
    </main>
  );
};

export default PaymentBooking;