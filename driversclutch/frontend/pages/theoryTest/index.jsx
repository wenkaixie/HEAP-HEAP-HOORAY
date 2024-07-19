"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '@/app/components/navbar/navbar';
import DateSelector from './DateSelector';
import TimeSlots from './TimeSlots';
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
  const [canceledBookings, setCanceledBookings] = useState([]);
  const [error, setError] = useState(null);
  const [studentData, setStudentData] = useState(null);


// use this to fetch the data from the webscrape
 useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const userDocID = localStorage.getItem('userDocID');
        if (!userDocID) {
          throw new Error('User document ID not found in localStorage');
        }
        console.log(`Fetching student data for userDocID: ${userDocID}`);
        const response = await axios.get(`${url}/students/booking/?id=${userDocID}`);
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
    if (studentData) {
    // adjust accordingly, change setLessonCount to the data u are fetching and using
    // use useState so:
    // const [availableSlots, setAvailableSlots] = useState(null)
      const { workStart, workEnd, lessonDuration, unavailableTimeslots, lessonCount } = studentData;
      setLessonCount(studentData.lessonCount);

    }
  }, []);


  const generateLessonNames = (bookings) => {
    const startingLessonNumber = lessonCount + 1;
    return bookings.map((booking, index) => ({
      ...booking,
      lesson: `Practical Driving Lesson ${startingLessonNumber + index}`
    }));
  };

  const handleAddBooking = (time) => {
    if (!studentData) return;
  
    const { lessonDuration } = studentData;
    const endTime = dayjs(selectedDate.format('YYYY-MM-DD') + ' ' + time, 'YYYY-MM-DD hh:mm A')
      .add(lessonDuration, 'hour')
      .format('hh:mm A');
  
    const newBooking = {
      date: selectedDate.format('D MMMM YYYY'),
      time,
      endTime,
      lesson: ''
    };
  
    const updatedBookings = [...bookings, newBooking].sort((a, b) =>
      dayjs(a.date + ' ' + a.time, 'D MMMM YYYY hh:mm A') -
      dayjs(b.date + ' ' + b.time, 'D MMMM YYYY hh:mm A')
    );
  
    setBookings(generateLessonNames(updatedBookings));
  
    setTimeslots(timeslots.map(slot =>
      slot.time === time ? { ...slot, available: false } : slot
    ));
  
    checkForClashes(updatedBookings);
  };

  const handleCancelBooking = (index) => {
    const bookingToRemove = bookings[index];
    const updatedBookings = bookings.filter((_, i) => i !== index).sort((a, b) =>
      dayjs(a.date + ' ' + a.time, 'D MMMM YYYY hh:mm A') -
      dayjs(b.date + ' ' + b.time, 'D MMMM YYYY hh:mm A')
    );
  
    setBookings(generateLessonNames(updatedBookings));
    setCanceledBookings([...canceledBookings, bookingToRemove]);
  
    setTimeslots(timeslots.map(slot =>
      slot.time === bookingToRemove.time ? { ...slot, available: true } : slot
    ));
  
    checkForClashes(updatedBookings);
  };
  




  useEffect(() => {
    checkForClashes(bookings);
  }, [bookings]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!studentData) {
    console.log('No student data found.');
    return <div>Loading...</div>;
  }

  const { fullname: instructorName } = studentData;

  return (
    <div className='dashboard'>
      <div className='title'>
        <h2>Lesson Booking</h2>
      </div>
      <div className="dashboard-container">
        <p>Instructor: {instructorName}</p>
        <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      </div>
      <div className="dashboard-container">
        <p>Time Slots Available</p>
        <TimeSlots
          timeslots={timeslots}
          selectedDate={selectedDate}
          handleAddBooking={handleAddBooking}
        />
      </div>
    </div>
  );
};

const BookingPage = () => {
  return (
    <main>
      <Navbar />
      <Dashboard />
    </main>
  );
};

export default BookingPage;
