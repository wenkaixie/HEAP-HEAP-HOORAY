// "use client";
// // Page.jsx
// import React, { useState, useEffect } from 'react';
// import Navbar from '@/app/components/navbar/navbar';
// import DateSelector from './DateSelector';
// import TimeSlots from './TimeSlots';
// import BookingSummary from './BookingSummary';
// import dayjs from 'dayjs';
// import './page.css';

// const Page = () => {
//   const [selectedDate, setSelectedDate] = useState(dayjs());
//   const [bookings, setBookings] = useState([]);
//   const [timeslots, setTimeslots] = useState([]);

//   // Store canceled bookings
//   const [canceledBookings, setCanceledBookings] = useState([]);

//   useEffect(() => {
//     // Dummy timeslot data for different dates
//     const timeslotData = {
//       '2024-06-08': [
//         { time: "01:00 AM", available: true },
//         { time: "01:30 AM", available: true },
//         { time: "02:00 AM", available: true },
//         { time: "02:30 AM", available: true }
//       ],
//       '2024-06-09': [
//         { time: "01:00 AM", available: true },
//         { time: "01:30 AM", available: true },
//         { time: "02:00 AM", available: true },
//         { time: "02:30 AM", available: true }
//       ],
//       '2024-06-14': [
//         { time: "02:30 PM", available: true },
//         { time: "03:00 PM", available: true },
//         { time: "05:00 PM", available: true }
//       ],
//       '2024-06-15': [
//         { time: "03:30 PM", available: true },
//         { time: "04:00 PM", available: true },
//         { time: "04:30 PM", available: true },
//         { time: "05:00 PM", available: true },
//         { time: "05:30 PM", available: true },
//         { time: "06:00 PM", available: true },
//         { time: "06:30 PM", available: true },
//         { time: "07:00 PM", available: true },
//         { time: "07:30 PM", available: true },
//       ]
//     };

//     const dateKey = selectedDate.format('YYYY-MM-DD');
//     setTimeslots(timeslotData[dateKey] || []);
//   }, [selectedDate]);

//   const handleAddBooking = (time) => {
//     // Add the booking
//     setBookings([...bookings, { date: selectedDate.format('D MMMM YYYY'), time }]);

//     // Update the availability of the timeslot
//     setTimeslots(timeslots.map(slot =>
//       slot.time === time ? { ...slot, available: false } : slot
//     ));
//   };

//   const handleCancelBooking = (index) => {
//     // Retrieve the booking to cancel
//     const bookingToRemove = bookings[index];

//     // Cancel the booking
//     const updatedBookings = bookings.filter((_, i) => i !== index);
//     setBookings(updatedBookings);

//     // Store canceled booking
//     setCanceledBookings([...canceledBookings, bookingToRemove]);

//     // Update the availability of the timeslot
//     setTimeslots(timeslots.map(slot =>
//       slot.time === bookingToRemove.time ? { ...slot, available: true } : slot
//     ));
//   };

//   // Function to re-book canceled booking
//   const handleRebookCanceledBooking = (bookingToRemove) => {
//     // Remove canceled booking from the list
//     const updatedCanceledBookings = canceledBookings.filter(
//       booking => booking.time !== bookingToRemove.time
//     );
//     setCanceledBookings(updatedCanceledBookings);

//     // Re-book the canceled timeslot
//     handleAddBooking(bookingToRemove.time);
//   };

//   return (
//     <div className="page">
//       <div className='navbar'>
//         <Navbar />
//       </div>
      
//       <div className="lesson">
//         <h1>Lesson Booking</h1>
//       </div>
//       <div className="content">
//         <div className="left-column">
//           <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
//         </div>
//         <div className="center-column">
//           <TimeSlots 
//             timeslots={timeslots} 
//             selectedDate={selectedDate} 
//             handleAddBooking={handleAddBooking} 
//           />
//         </div>
//         <div className="right-column">
//           <BookingSummary 
//             bookings={bookings} 
//             canceledBookings={canceledBookings} 
//             handleCancelBooking={handleCancelBooking} 
//             handleRebookCanceledBooking={handleRebookCanceledBooking} 
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;

// page.jsx
"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '@/app/components/navbar/navbar';
import DateSelector from './DateSelector';
import TimeSlots from './TimeSlots';
import BookingSummary from './BookingSummary';
import dayjs from 'dayjs';
import './page.css';

const Page = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [bookings, setBookings] = useState([]);
  const [timeslots, setTimeslots] = useState([]);
  const [canceledBookings, setCanceledBookings] = useState([]);
  const [isNextStep, setIsNextStep] = useState(false);
  const [hasClashes, setHasClashes] = useState(false);

  const lessonsData = [
    'Practical Driving Lesson 4',
    'Practical Driving Lesson 5',
    'Practical Driving Lesson 6',
    'Practical Driving Lesson 7',
    'Practical Driving Lesson 8'
  ];

  useEffect(() => {
    const timeslotData = {
      '2024-06-08': [
        { time: "01:00 AM", available: true },
        { time: "01:30 AM", available: true },
        { time: "02:00 AM", available: true },
        { time: "02:30 AM", available: true }
      ],
      '2024-06-09': [
        { time: "01:00 AM", available: true },
        { time: "01:30 AM", available: true },
        { time: "02:00 AM", available: true },
        { time: "02:30 AM", available: true }
      ],
      '2024-06-14': [
        { time: "02:30 PM", available: true },
        { time: "03:00 PM", available: true },
        { time: "05:00 PM", available: true }
      ],
      '2024-06-15': [
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
    const duration = 1.5; // Assume duration is 2 hours
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
    setIsNextStep(true);
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
    <div className="page">
      <div className='navbar'>
        <Navbar />
      </div>
      
      <div className="lesson">
        <h1>Lesson Booking</h1>
      </div>
      <div className="content">
        <div className="left-column">
          <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </div>
        <div className="center-column">
          <TimeSlots 
            timeslots={timeslots} 
            selectedDate={selectedDate} 
            handleAddBooking={handleAddBooking} 
          />
        </div>
        <div className="right-column">
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

export default Page;


