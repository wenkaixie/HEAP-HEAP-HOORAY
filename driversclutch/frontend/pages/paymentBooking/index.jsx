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
import { url } from '../../src/app/firebase/firebase_config';

dayjs.extend(utc);
dayjs.extend(timezone);

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [creditBalance, setCreditBalance] = useState(0);
  const [pricePerLesson, setPricePerLesson] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const userDocID = localStorage.getItem('userDocID');
        if (!userDocID) {
          throw new Error('User document ID not found in localStorage');
        }
        console.log(`Fetching student data for userDocID: ${userDocID}`);
        const response = await axios.get(`${url}/students/balance/?id=${userDocID}`);
        console.log('API Response:', response.data);
        setStudentData(response.data);
      } catch (error) {
        console.error('Error fetching student data:', error);
        setError(error.message);
      }
    };

    fetchStudentData();
  }, []);

    
    useEffect(() => {
        if(studentData){
            setCreditBalance(studentData.balance);
            setPricePerLesson(studentData.lessonFee)
        }
      })
  
  const numOfBookings = bookings.length;
  const totalPrice = numOfBookings * pricePerLesson;

  useEffect(() => {
    const storedBookings = localStorage.getItem('bookings');
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    }
  }, []);

const convertToRequiredFormat = (bookings) => {
    const datetimes = [];
    const unavailableTimeslots = [];
  
    bookings.forEach(booking => {
      const { date, time } = booking;
      if (date && time) {
        const startDateTimeString = `${date} ${time}`;
        const parsedStartDate = dayjs(startDateTimeString, 'YYYY-MM-DD hh:mm A').utcOffset(8);
        
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
        balance: remainingBalance,
        unavailableTimeslots: unavailableTimeslots
      };
      console.log("Sending data to server:", requestData);

      const response = await axios.post(`${url}/students/booking/updateStudent`, requestData, {
        headers: {
          'Content-Type': 'application/json'
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
      const remainingBalance = creditBalance - totalPrice;
      const { datetimes } = convertToRequiredFormat(bookings);
      const requestData = {
        studentID: userDocID,
        timeslots: datetimes
      };
      console.log("Sending data to server:", requestData); // Log the request data

      const response = await axios.post(`${url}/students/booking/updateInstructor`, requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log("UpcomingLessons data successfully sent to the database.");
        setCreditBalance(remainingBalance);
        setIsPopupVisible(true);
        localStorage.removeItem('bookings'); 
        console.log('Bookingdetails removed from localStorage');
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
    window.location.href = "./booking";
  };

  return (
    <div className="dashboard">
      <div className="title">
        <h2>Payment Details</h2>
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
        <p>Credits Left : ${creditBalance}</p>
        {creditBalance < totalPrice && (
          <div className="insufficient-credits">
            {/* update link for top up!!!! */}
            Insufficient credits. Click <a href="./balance">here</a> to top up.
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
