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

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [bookings, setBookings] = useState([]);
  const [timeslots, setTimeslots] = useState([]);
  const [canceledBookings, setCanceledBookings] = useState([]);
  const [hasClashes, setHasClashes] = useState(false);
  const [error, setError] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const userDocID = localStorage.getItem('userDocID');
        if (!userDocID) {
          throw new Error('User document ID not found in localStorage');
        }
        console.log(`Fetching student data for userDocID: ${userDocID}`);
        const response = await axios.get(`http://localhost:8001/students/booking/?id=${userDocID}`);
        console.log('API Response:', response.data);
        setStudentData(response.data);
      } catch (error) {
        console.error('Error fetching student data:', error);
        setError(error.message);
      }
    };

    fetchStudentData();
  }, []);
  

  // const lessonsData = [
  //   'Practical Driving Lesson 4',
  //   'Practical Driving Lesson 5',
  //   'Practical Driving Lesson 6',
  //   'Practical Driving Lesson 7',
  //   'Practical Driving Lesson 8'
  // ];

  useEffect(() => {
    if (studentData) {
      const { workStart, workEnd, lessonDuration, unavailableTimeslots, completedLessons } = studentData;
      setCompletedLessons(studentData.completedLessons);

      const generateTimeslots = () => {
        const start = dayjs(workStart, 'hh:mm A');
        const end = dayjs(workEnd, 'hh:mm A');
        const generatedTimes = [];
        let currentTime = start;

        while (currentTime.isBefore(end) || currentTime.isSame(end)) {
          generatedTimes.push(currentTime.format('hh:mm A'));
          currentTime = currentTime.add(lessonDuration, 'hour');
        }

        return generatedTimes;
      };

      const markUnavailableTimeslots = (timeslots, unavailableTimes) => {
        const timeZone = 'Asia/Singapore';
        const unavailableTimesData = {};

        unavailableTimes.forEach(dateTime => {
          const date = dayjs.utc(dateTime).tz(timeZone);
          const formattedDate = date.format('YYYY-MM-DD');
          const formattedTime = date.format('hh:mm A');

          if (!unavailableTimesData[formattedDate]) {
            unavailableTimesData[formattedDate] = [];
          }
          unavailableTimesData[formattedDate].push(formattedTime);
        });

        const dateKey = selectedDate.format('YYYY-MM-DD');
        return timeslots.map(time => ({
          time,
          available: !(unavailableTimesData[dateKey] && unavailableTimesData[dateKey].includes(time))
        }));
      };

      const availableTimes = generateTimeslots();
      const timeslotData = markUnavailableTimeslots(availableTimes, unavailableTimeslots);

      setTimeslots(timeslotData);
    }
  }, [studentData, selectedDate]);


  const generateLessonNames = (bookings) => {
    const startingLessonNumber = completedLessons.length + 1;
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
  
  /////////////////
  
  // const handleAddBooking = (time) => {
  //   if (!studentData) return;

  //   const { lessonDuration } = studentData;
  //   const endTime = dayjs(selectedDate.format('YYYY-MM-DD') + ' ' + time, 'YYYY-MM-DD hh:mm A')
  //     .add(lessonDuration, 'hour')
  //     .format('hh:mm A');

  //   const newBooking = {
  //     date: selectedDate.format('D MMMM YYYY'),
  //     time,
  //     endTime,
  //     lesson: ''
  //   };

  //   const updatedBookings = [...bookings, newBooking].sort((a, b) =>
  //     dayjs(a.date + ' ' + a.time, 'D MMMM YYYY hh:mm A') -
  //     dayjs(b.date + ' ' + b.time, 'D MMMM YYYY hh:mm A')
  //   );

  //   setBookings(updatedBookings.map((booking, index) => ({
  //     ...booking,
  //     lesson: lessonsData[index]
  //   })));

  //   setTimeslots(timeslots.map(slot =>
  //     slot.time === time ? { ...slot, available: false } : slot
  //   ));

  //   checkForClashes(updatedBookings);
  // };

  // const handleCancelBooking = (index) => {
  //   const bookingToRemove = bookings[index];
  //   const updatedBookings = bookings.filter((_, i) => i !== index).sort((a, b) =>
  //     dayjs(a.date + ' ' + a.time, 'D MMMM YYYY hh:mm A') -
  //     dayjs(b.date + ' ' + b.time, 'D MMMM YYYY hh:mm A')
  //   );

  //   setBookings(updatedBookings.map((booking, index) => ({
  //     ...booking,
  //     lesson: lessonsData[index]
  //   })));

  //   setCanceledBookings([...canceledBookings, bookingToRemove]);

  //   setTimeslots(timeslots.map(slot =>
  //     slot.time === bookingToRemove.time ? { ...slot, available: true } : slot
  //   ));

  //   checkForClashes(updatedBookings);
  // };

  const handleRebookCanceledBooking = (bookingToRemove) => {
    const updatedCanceledBookings = canceledBookings.filter(
      booking => booking.time !== bookingToRemove.time
    );
    setCanceledBookings(updatedCanceledBookings);

    handleAddBooking(bookingToRemove.time);
  };

  const handleNextStep = () => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
    window.location.href = "./paymentBooking";
  };

  const checkForClashes = (bookings) => {
    const hasClashes = bookings.some((booking, index) => {
      const bookingStart = dayjs(booking.date + ' ' + booking.time, 'D MMMM YYYY hh:mm A');
      const bookingEnd = dayjs(booking.date + ' ' + booking.endTime, 'D MMMM YYYY hh:mm A');
      return bookings.some((otherBooking, otherIndex) => {
        if (index === otherIndex) return false;
        const otherBookingStart = dayjs(otherBooking.date + ' ' + otherBooking.time, 'D MMMM YYYY hh:mm A');
        const otherBookingEnd = dayjs(otherBooking.date + ' ' + otherBooking.endTime, 'D MMMM YYYY hh:mm A');
        return bookingStart.isBefore(otherBookingEnd) && bookingEnd.isAfter(otherBookingStart);
      });
    });

    setHasClashes(hasClashes);
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
        <h1>Lesson Booking</h1>
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
      <div className="dashboard-container">
        <div className='right'>
          <p>Booking Summary</p>
          <BookingSummary
            bookings={bookings}
            canceledBookings={canceledBookings}
            handleCancelBooking={handleCancelBooking}
            handleRebookCanceledBooking={handleRebookCanceledBooking}
            handleNextStep={handleNextStep}
            hasClashes={hasClashes}
          />
        </div>
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
