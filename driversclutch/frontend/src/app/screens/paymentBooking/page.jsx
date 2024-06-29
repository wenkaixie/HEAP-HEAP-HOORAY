"use client";
import "./page.css";
import React, { useEffect, useState } from 'react';

const PaymentBooking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedBookings = localStorage.getItem('bookings');
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    }
  }, []);

  return (
    <div className="payment-booking">
      <h1>Booking Details</h1>
      {bookings.map((booking, index) => (
        <div key={index} className="booking-item">
          <p>Lesson: {booking.lesson}</p>
          <p>Date: {booking.date}</p>
          <p>Time: {booking.time} - {booking.endTime}</p>
        </div>
      ))}
    </div>
  );
};

export default PaymentBooking;
