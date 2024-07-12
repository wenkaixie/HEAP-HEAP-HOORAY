"use client";
import "./page.css";
import React, { useEffect, useState } from 'react';
import Navbar from '@/app/components/navbar/navbar';
import '@/app/components/background/background.css'
import '@/app/components/dashboard/dashboard.css';
import { GiCancel } from "react-icons/gi";
import { SiTicktick } from "react-icons/si";
import axios from 'axios'; 
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

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

  const convertToRequiredFormat = (bookings) => {
    const timeZone = 'Asia/Singapore'; // Define the desired time zone
    const datetimes = [];
    const unavailableTimeslots = [];

    bookings.forEach(booking => {
      const { date, time } = booking;
      if (date && time) {
        const startDateTimeString = `${date} ${time}`;
        const parsedStartDate = dayjs.tz(startDateTimeString, 'YYYY-MM-DD hh:mm A', timeZone);
        
        const unavailableEndTime = parsedStartDate.add(30, 'minute');

        datetimes.push(parsedStartDate.toISOString());

        unavailableTimeslots.push(parsedStartDate.toISOString(), unavailableEndTime.toISOString());
      } else {
        console.error(`Invalid booking entry: ${JSON.stringify(booking)}`);
      }
    });

    return { datetimes, unavailableTimeslots };
};

const updateDatabaseStudent = async () => {
    try {
      const userDocID = localStorage.getItem('userDocID');
      const remainingBalance = creditBalance - totalPrice;
      const { datetimes, unavailableTimeslots } = convertToRequiredFormat(bookings);
      const requestData = {
        studentID: userDocID,
        timeslots: datetimes,
        unavailableTimeslots: unavailableTimeslots,
        balance: remainingBalance,
      };
      console.log("Sending data to server:", requestData); // Log the request data

      const response = await axios.post('http://localhost:8001/students/booking/updateStudent', requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log("Booking data successfully sent to the database.");
      } else {
        console.error("Failed to send booking data.");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    }
};

const updateDatabaseInstructor = async () => {
    try {
      const userDocID = localStorage.getItem('userDocID');
      const { datetimes } = convertToRequiredFormat(bookings);
      const requestData = {
        studentID: userDocID,
        timeslots: datetimes
      };
      console.log("Sending data to server:", requestData); // Log the request data

      const response = await axios.post('http://localhost:8001/students/booking/updateInstructor', requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log("UpcomingLessons data successfully sent to the database.");
        setCreditBalance(remainingBalance);
        setIsPopupVisible(true);
      } else {
        console.error("Failed to send UpcomingLessons data.");
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
      await updateDatabaseStudent();
      await updateDatabaseInstructor();
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
