"use client";
import React, { useState } from 'react';
import Navbar from '@/app/components/navbar/navbar';
import DateSelector from './DateSelector';
import TimeTable from './TimeTable';
import './page.css';
import dayjs from 'dayjs';

const Page = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [availability, setAvailability] = useState({});

  const handleAvailabilityChange = (date, time) => {
    const dateKey = date.format('YYYY-MM-DD');
    const newAvailability = { ...availability };
  
    if (!newAvailability[dateKey]) {
      newAvailability[dateKey] = [];
    }
  
    if (newAvailability[dateKey].includes(time)) {
      newAvailability[dateKey] = newAvailability[dateKey].filter(t => t !== time);
    } else {
      newAvailability[dateKey].push(time);
    }
  
    setAvailability(newAvailability);
  };

  const handleSelectAllChange = (date, times, isChecked) => {
    const dateKey = date.format('YYYY-MM-DD');
    const newAvailability = { ...availability };
  
    if (isChecked) {
      newAvailability[dateKey] = times;
    } else {
      newAvailability[dateKey] = [];
    }
  
    setAvailability(newAvailability);
  };

  // SEND TO DATABASE HEHEHEHEHEHE
// {
//   "availability": {
//     "2024-06-16": ["09:00 AM", "10:00 AM", "01:00 PM"],
//     "2024-06-17": ["11:00 AM", "02:30 PM", "04:00 PM"]
//   }
// }
  const handleConfirm = async () => {
    try {
      const response = await fetch('api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ availability }),
      });

      if (response.ok) {
        console.log("Availability data successfully sent to the database.");

      } else {
        console.error("Failed to send availability data.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="page">
      <div className='navbar'>
        <Navbar />
      </div>
      <div className="lesson">
        <h1>Lesson Availability</h1>
      </div>
      <div className="content">
        <div className="left-column">
          <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </div>
        <div className="right-column">
          <TimeTable 
            selectedDate={selectedDate} 
            availability={availability} 
            handleAvailabilityChange={handleAvailabilityChange} 
            handleSelectAllChange={handleSelectAllChange}
            handleConfirm={handleConfirm}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;

