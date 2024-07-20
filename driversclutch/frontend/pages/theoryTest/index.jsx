    // use this to fetch the data from the webscrape (EDIT!!)
    //  useEffect(() => {
    //     const fetchStudentData = async () => {
    //       try {
    //         const userDocID = localStorage.getItem('userDocID');
    //         if (!userDocID) {
    //           throw new Error('User document ID not found in localStorage');
    //         }
    //         console.log(`Fetching student data for userDocID: ${userDocID}`);
    //         const response = await axios.get(`${url}/students/booking/?id=${userDocID}`);
    //         console.log('API Response:', response.data);
    //         setStudentData(response.data);
    //       } catch (error) {
    //         console.error('Error fetching student data:', error);
    //         setError(error.message);
    //       }
    //     };

    //     fetchStudentData();
    //   }, []);

    //   useEffect(() => {
    //     if (studentData) {
    //     // adjust accordingly, change setLessonCount to the data u are fetching and using
    //     // use useState so:
    //     // const [availableSlots, setAvailableSlots] = useState(null)
    //       const { workStart, workEnd, lessonDuration, unavailableTimeslots, lessonCount } = studentData;
    //       setLessonCount(studentData.lessonCount);

    //     }
    //   }, []);



    //   if (error) {
    //     return <div>Error: {error}</div>;
    //   }

    //   if (!studentData) {
    //     console.log('No student data found.');
    //     return <div>Loading...</div>;
    //   }

    "use client";
    import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    import Navbar from '@/app/components/navbar/navbar';
    import DateSelector from './DateSelector';
    import TimeSlots from './TimeSlots';
    import BookingSummary from './BookingSummary';
    import dayjs from 'dayjs';
    import './page.css';
    import '@/app/components/background/background.css';
    import '@/app/components/dashboard/dashboard.css';
    import customParseFormat from 'dayjs/plugin/customParseFormat';
    import utc from 'dayjs/plugin/utc';
    import timezone from 'dayjs/plugin/timezone';
    import { url } from '../../src/app/firebase/firebase_config';
    
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.extend(customParseFormat);
    
    const Dashboard = () => {
      const [selectedDate, setSelectedDate] = useState(dayjs());
      const [bookings, setBookings] = useState([]);
      const [timeslots, setTimeslots] = useState([]);
      const [selectedTimeslot, setSelectedTimeslot] = useState(null);
      const [error, setError] = useState(null);
      const [studentData, setStudentData] = useState(null);
      const [price, setPrice] = useState(50); // Set the price here
    
      useEffect(() => {
        // HARDCODED DATA!!!!! (DELETE)
        const data = {
          "2024-07-21": [
            { "time": "09:00 AM", "available": true },
            { "time": "11:00 AM", "available": true }
          ],
          "2024-07-22": [
            { "time": "10:00 AM", "available": true },
            { "time": "12:00 PM", "available": true }
          ]
        };
    
        setStudentData(data);
      }, []);
    
      useEffect(() => {
        if (studentData) {
          const dateStr = selectedDate.format("YYYY-MM-DD");
          const dataForDate = studentData[dateStr];
    
          if (dataForDate) {
            setTimeslots(dataForDate);
          } else {
            setTimeslots([]);
          }
        }
      }, [selectedDate, studentData]);
    
      const handleAddBooking = (timeslot) => {
        setSelectedTimeslot(timeslot.time); // only store the time string
      };
    
      const handleCancelBooking = () => {
        setSelectedTimeslot(null);
      };
    
      const handleNextStep = () => {
        // all of the below can refer to paymentBooking index.jsx
        // deduct from balance (i need to fetch balance too)
        // send booking details to backend
        // show a popup screen to show that booking confirmed (only when data is successfully sent) 
        // when i click the close button, user returns back to the refreshed theory page (and hopefully there is a note below the timeslots that writes that the user has already took the test)
      };
    
      return (
        <div className='dashboard'>
          <div className='title'>
            <h2>Theory Test Booking</h2>
          </div>
          <div className="dashboard-container">
            <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          </div>
          <div className="dashboard-container">
            <p>Time Slots Available</p>
            <TimeSlots
              timeslots={timeslots}
              selectedDate={selectedDate}
              handleAddBooking={handleAddBooking}
              selectedTimeslot={selectedTimeslot}
            />
          </div>
          <div className="dashboard-container">
            <div className='right'>
              <p>Booking Summary</p>
              <BookingSummary
                selectedDate={selectedDate}
                selectedTimeslot={selectedTimeslot}
                handleCancelBooking={handleCancelBooking}
                handleNextStep={handleNextStep}
                price={price}
              />
            </div>
          </div>
        </div>
      );
    };
    
    const TheoryBookingPage = () => {
      return (
        <main>
          <Navbar />
          <Dashboard />
        </main>
      );
    };
    
    export default TheoryBookingPage;
    

