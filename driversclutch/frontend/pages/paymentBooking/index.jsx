"use client";
import "./page.css";
import React, { useEffect, useState } from 'react';
import '../../components/background/background.css';
import Navbar from '@/app/components/navbar/navbar';
import '../../components/dashboard/dashboard.css';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [creditBalance, setCreditBalance] = useState(100); // HARDCODED BALANCE! FETCH BALANCE FROM DATABASE!
  const pricePerLesson = 50; // HARDCODED PRICE! FETCH THE PRICE INDICATED BY INSTRUCTOR IN THE PROFILE PAGE FROM THE DATABASE!
  const numOfBookings = bookings.length;
  const totalPrice = numOfBookings * pricePerLesson;

  useEffect(() => {
    const storedBookings = localStorage.getItem('bookings');
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    }
  }, []);

  const updateBalance = async () => {
    const remainingBalance = creditBalance - totalPrice;
    // Send the remaining balance to the database (API call example)
    // await fetch('/api/updateBalance', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ balance: remainingBalance }),
    // });
    setCreditBalance(remainingBalance);
  };

  const updateDatabase = async () => {
    // Send booking details to the database (API call example)
    // Convert booking date and time to ISO 8601 format
    const bookingDetails = bookings.map(booking => ({
      date: new Date(booking.date).toISOString(),
      // Only start time will be sent over!
      time: new Date(`${booking.date}T${booking.time}`).toISOString(), 
    }));

    // await fetch('/api/updateBookings', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ bookings: bookingDetails }),
    // });
  };

  const handleClick = async () => {
    if (creditBalance >= totalPrice) {
      await updateBalance();
      await updateDatabase();
    }
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
            Insufficient credits. Click <a href="/top-up">here</a> to top up.
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
