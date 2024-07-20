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

dayjs.tz.setDefault("Asia/Singapore");

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [bookings, setBookings] = useState([]);
  const [timeslots, setTimeslots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [canceledBookings, setCanceledBookings] = useState([]);
  const [error, setError] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [lessonCount, setLessonCount] = useState(0);

  const handleDateChange = async (date) => {
    setSelectedDate(date);

    // Format the date for the backend
    const month = date.format('MMM').toUpperCase();
    const day = date.date();

    try {
      const response = await axios.get(`${url}/webscraping/make-booking`, {
        params: { month: `${month}'24`, date: day }
      });
      setTimeslots(response.data.availableSlots);
    } catch (error) {
      console.error('Error fetching timeslots:', error);
      setError('Failed to fetch timeslots');
    }
  };

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
      const { lessonCount } = studentData;
      setLessonCount(lessonCount);
    }
  }, [studentData]);

  const generateLessonNames = (bookings) => {
    const startingLessonNumber = lessonCount + 1;
    return bookings.map((booking, index) => ({
      ...booking,
      lesson: `Practical Driving Lesson ${startingLessonNumber + index}`
    }));
  };

  const handleAddBooking = (slot) => {
    setSelectedSlot(slot);
  };

  const handleConfirmBooking = async () => {
    if (!selectedDate || !selectedSlot) {
      alert('Please select a date and time slot before confirming the booking.');
      return;
    }

    try {
      const response = await axios.post(`${url}/webscraping/confirm-booking`, {
        date: selectedDate.format('YYYY-MM-DD'),
        slot: selectedSlot
      });

      if (response.data.status === 'success') {
        alert('Booking confirmed successfully');
      } else {
        alert('Failed to confirm booking');
      }
    } catch (error) {
      console.error('Error confirming booking:', error);
      alert('Failed to confirm booking');
    }
  };

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
        <h2>Theory Test Booking</h2>
      </div>
      <div className="dashboard-container">
        <p>Centre: Bukit Batok Driving Centre</p>
        <DateSelector selectedDate={selectedDate} setSelectedDate={handleDateChange} />
        <button className="confirm-button" onClick={handleConfirmBooking}>Confirm Booking</button>
      </div>
      <div className="dashboard-container">
        <p>Test Time Slots Available</p>
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
