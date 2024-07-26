import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './page.css';
import { url } from '../../src/app/firebase/firebase_config';
import { format, isValid, parse } from 'date-fns';

const Navbar = () => (
  <div className="navbar">
    Theory Test Booking
  </div>
);

const Sidebar = () => (
  <div className="sidebar">
    <div className="menu">
      <ul>
        <li>Home</li>
        <li>Booking</li>
        <li>Theory</li>
        <li>Practical</li>
        <li>Test</li>
        <li>Manage Booking</li>
        <li>Training History</li>
        <li>Transactions</li>
        <li>Manage Account</li>
        <li>Tutorial</li>
      </ul>
    </div>
    <div className="profile">
      <p>Welcome Back</p>
      <p>K***** WEI</p>
      <p>Account Balance: $860.92</p>
      <p>Membership Expiry: 12 Mar 2025</p>
      <button>Logout</button>
    </div>
  </div>
);

const Calendar = ({ selectedMonth, setSelectedMonth, selectedDate, setSelectedDate }) => {
  const months = ['JUL\'24', 'AUG\'24', 'SEP\'24', 'OCT\'24', 'NOV\'24', 'DEC\'24'];
  const daysInMonth = {
    'JUL\'24': 31,
    'AUG\'24': 31,
    'SEP\'24': 30,
    'OCT\'24': 31,
    'NOV\'24': 30,
    'DEC\'24': 31,
  };

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // months are 0-based
  const currentDay = currentDate.getDate();

  const getMonthIndex = (month) => {
    const monthMap = {
      'JUL\'24': 7,
      'AUG\'24': 8,
      'SEP\'24': 9,
      'OCT\'24': 10,
      'NOV\'24': 11,
      'DEC\'24': 12,
    };
    return monthMap[month];
  };

  const isDatePast = (month, date) => {
    const monthIndex = getMonthIndex(month);
    if (currentYear > 2024) return true;
    if (currentYear === 2024 && currentMonth > monthIndex) return true;
    if (currentYear === 2024 && currentMonth === monthIndex && currentDay > date) return true;
    return false;
  };

  const handleDateClick = (date) => {
    if (isDatePast(selectedMonth, date)) {
      return; // Do not allow selection of past dates
    }
    setSelectedDate(date);
  };

  return (
    <div className="calendar">
      <div className="monthButtons">
        {months.map(month => (
          <button
            key={month}
            className={month === selectedMonth ? 'selected' : ''}
            onClick={() => {
              setSelectedMonth(month);
              setSelectedDate('');
            }}
          >
            {month}
          </button>
        ))}
      </div>
      <br></br>
      <div className="calendarContainer">
        <div className="days">
          {Array.from({ length: daysInMonth[selectedMonth] }, (_, index) => (
            <div
              key={index + 1}
              className={`day ${selectedDate === index + 1 ? 'selected' : ''} ${isDatePast(selectedMonth, index + 1) ? 'past' : ''}`}
              onClick={() => handleDateClick(index + 1)}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
      <div className="selected-date">
        <p>Date Selected:</p>
        <p>{selectedDate ? `2024-${selectedMonth.split('\'')[0]}-${String(selectedDate).padStart(2, '0')}` : '(No Date Selected)'}</p>
      </div>
    </div>
  );
};

const slotTimes = [
  '07:30 - 08:15',
  '08:25 - 09:10',
  '09:20 - 10:05',
  '10:15 - 11:00',
  '11:30 - 12:15',
  '12:25 - 13:10',
  '13:20 - 14:05',
  '14:15 - 15:00',
  '15:20 - 16:05',
  '16:15 - 17:00',
  '17:10 - 17:55',
  '18:05 - 18:50',
  '22:05 - 22:50',
];

const getFixedSlotsForDate = (date) => {
  const day = date.getDate();

  if (day < 10) {
    return [0, 2, 4, 6].map(index => `SESSION ${index + 1} ${slotTimes[index]} $5.45`);
  } else if (day >= 10 && day < 20) {
    return [1, 3, 5, 7].map(index => `SESSION ${index + 1} ${slotTimes[index]} $5.45`);
  } else if (day >= 20 && day < 30) {
    return [0, 8, 9, 10].map(index => `SESSION ${index + 1} ${slotTimes[index]} $5.45`);
  } else {
    return slotTimes.map((slot, index) => `SESSION ${index + 1} ${slot} $5.45`);
  }
};

const Slots = ({ selectedDate, selectedSlot, setSelectedSlot, slots }) => {
  const handleSlotClick = (slot) => {
    if (selectedSlot === slot) {
      setSelectedSlot(''); // Deselect the slot if it is already selected
    } else {
      setSelectedSlot(slot);
    }
  };

  return (
    <div className="slots">
      <div className="slotContainer">
        {slots.map(slot => (
          <div
            key={slot}
            className={`slot ${selectedSlot === slot ? 'selected' : ''}`}
            onClick={() => handleSlotClick(slot)}
          >
            {slot}
          </div>
        ))}
      </div>
    </div>
  );
};

const Summary = ({ selectedMonth, selectedDate, selectedSlot, handleConfirmBooking }) => (
  <div className="summary">
    <h2>SUMMARY</h2>
    <div className="summary-item">
      <p>{selectedDate ? `2024-${selectedMonth.split('\'')[0]}-${String(selectedDate).padStart(2, '0')}` : 'No Date Selected'}</p>
      <p>{selectedSlot || 'No Slot Selected'}</p>
    </div>
    <div className="confirm-button-container">
      <button 
        className={`confirm-button ${selectedSlot ? '' : 'disabled'}`} 
        onClick={handleConfirmBooking} 
        disabled={!selectedSlot}
      >
        Confirm Booking
      </button>
    </div>
  </div>
);

const BookingPage = () => {
  const [selectedMonth, setSelectedMonth] = useState("JUL'24");
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [slots, setSlots] = useState([]);

  const getMonthIndex = (month) => {
    const monthMap = {
      "JUL'24": 6, // month index starts from 0
      "AUG'24": 7,
      "SEP'24": 8,
      "OCT'24": 9,
      "NOV'24": 10,
      "DEC'24": 11,
    };
    return monthMap[month];
  };

  useEffect(() => {
    if (selectedMonth) {
      setSelectedSlot(''); // Clear the selected slot when the month changes
    }
    if (selectedDate) {
      const monthIndex = getMonthIndex(selectedMonth);
      const date = new Date(2024, monthIndex, selectedDate);
      setSlots(getFixedSlotsForDate(date));
      setSelectedSlot(''); // Clear the selected slot when the date changes
    }
  }, [selectedDate, selectedMonth]);

  const handleConfirmBooking = async () => {
    if (!selectedDate || !selectedSlot) {
      alert('Please select a date and slot before confirming the booking.');
      return;
    }
  
    try {
      // Parse and format the date using date-fns
      const monthIndex = getMonthIndex(selectedMonth);
      const dateString = `2024-${monthIndex + 1}-${String(selectedDate).padStart(2, '0')}`;
      const parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());
      const formattedDate = isValid(parsedDate) ? format(parsedDate, 'yyyy-MM-dd') : '';
      const userDocID = localStorage.getItem('userDocID'); 

      console.log(formattedDate, " --- ", selectedSlot);
      const response = await axios.post(`http://localhost:8001/webscraping/confirm-booking-nonscrape`, {
        date: formattedDate,
        slot: selectedSlot,
        studentID: userDocID
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

  return (
    <main>
      <Navbar />
      <div className="mainContent">
        <Sidebar />
        <div className="content">
          <Calendar selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          <Slots selectedDate={selectedDate} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} slots={slots} />
          <Summary selectedMonth={selectedMonth} selectedDate={selectedDate} selectedSlot={selectedSlot} handleConfirmBooking={handleConfirmBooking} />
        </div>
      </div>
    </main>
  );
};

export default function Home() {
  return (
    <div>
      <BookingPage />
    </div>
  );
};