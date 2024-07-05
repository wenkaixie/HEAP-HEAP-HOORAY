"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '@/app/components/navbar/navbar';
import DateSelector from './DateSelector';
import TimeSlots from './TimeSlots';
import BookingSummary from './BookingSummary';
import dayjs from 'dayjs';
import './page.css';
import '@/app/components/background/background.css'
import '@/app/components/dashboard/dashboard.css'

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [bookings, setBookings] = useState([]);
  const [timeslots, setTimeslots] = useState([]);
  const [canceledBookings, setCanceledBookings] = useState([]);
  const [hasClashes, setHasClashes] = useState(false);
  

  // HARDCODED DATA (DELETE)
  const lessonsData = [
    'Practical Driving Lesson 4',
    'Practical Driving Lesson 5',
    'Practical Driving Lesson 6',
    'Practical Driving Lesson 7',
    'Practical Driving Lesson 8'
  ];

  // HARDCODED DATA (DELETE)
  useEffect(() => {
    const timeslotData = {
      '2024-06-14': [
        { time: "02:30 PM", available: true },
        { time: "03:00 PM", available: true },
        { time: "05:00 PM", available: true }
      ],
      '2024-07-26': [
        { time: "03:30 PM", available: true },
        { time: "04:00 PM", available: true },
        { time: "04:30 PM", available: true },
        { time: "05:00 PM", available: true },
        { time: "05:30 PM", available: true },
        { time: "06:00 PM", available: true },
        { time: "06:30 PM", available: true },
        { time: "07:00 PM", available: true },
        { time: "07:30 PM", available: true },
      ]
    };

    const dateKey = selectedDate.format('YYYY-MM-DD');
    let availableTimeslots = timeslotData[dateKey] || [];

    setTimeslots(availableTimeslots);
  }, [selectedDate]);

  const handleAddBooking = (time) => {
    const duration = 1.5; // Assume duration is 1.5h
    const endTime = dayjs(selectedDate.format('YYYY-MM-DD') + ' ' + time, 'YYYY-MM-DD hh:mm A')
      .add(duration, 'hour')
      .format('hh:mm A');

    const newBooking = {
      date: selectedDate.format('D MMMM YYYY'),
      time,
      endTime,
      lesson: ''  // Will be set later based on order
    };

    const updatedBookings = [...bookings, newBooking].sort((a, b) => 
      dayjs(a.date + ' ' + a.time, 'D MMMM YYYY hh:mm A') - 
      dayjs(b.date + ' ' + b.time, 'D MMMM YYYY hh:mm A')
    );

    setBookings(updatedBookings.map((booking, index) => ({
      ...booking,
      lesson: lessonsData[index]
    })));

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

    setBookings(updatedBookings.map((booking, index) => ({
      ...booking,
      lesson: lessonsData[index]
    })));

    setCanceledBookings([...canceledBookings, bookingToRemove]);

    setTimeslots(timeslots.map(slot =>
      slot.time === bookingToRemove.time ? { ...slot, available: true } : slot
    ));

    checkForClashes(updatedBookings);
  };

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

  return (
    // <div className="page">
    //   <div className='navbar'>
    //     <Navbar />
    //   </div>
      
    //   <div className="lesson">
    //     <h1>Lesson Booking</h1>
    //   </div>
    //   <div className="content">
    //     <div className="left-column">
    //       <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
    //     </div>
    //     <div className="center-column">
    //       <TimeSlots 
    //         timeslots={timeslots} 
    //         selectedDate={selectedDate} 
    //         handleAddBooking={handleAddBooking} 
    //       />
    //     </div>
    //     <div className="right-column">
    //       <BookingSummary 
    //         bookings={bookings} 
    //         canceledBookings={canceledBookings} 
    //         handleCancelBooking={handleCancelBooking} 
    //         handleRebookCanceledBooking={handleRebookCanceledBooking} 
    //         handleNextStep={handleNextStep}
    //         hasClashes={hasClashes}
    //       />
    //     </div>
    //   </div>
    // </div>
    <div className='dashboard'>
        <div className='title'>
          <h1>Lesson Booking</h1>
        </div>
        <div className="dashboard-container">
          <p>Booking for: INSTRUCTOR'S NAME</p>
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
      <div>
        <Navbar/>
      </div>
      <Dashboard/>
    </main>
  )
}
export default BookingPage;
