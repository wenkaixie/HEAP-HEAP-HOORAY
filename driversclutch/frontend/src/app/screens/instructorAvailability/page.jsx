"use client";
import React, { useState } from 'react';
import Navbar from '@/app/components/instructorNavbar/navbar';
import '../../components/dashboard/dashboard.css';
import DateSelector from './DateSelector';
import TimeTable from './TimeTable';
import './page.css';
import dayjs from 'dayjs';
import '../../components/background/background.css';

const Dashboard = () => {
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
    <div className='dashboard'>
        <div className='title'>
          <h1>Lesson Availability</h1>
        </div>
        <div className="dashboard-container">
          <p>Select a date</p>
          <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </div>
        <div className="dashboard-container">
          <p>Select Your Unavailable Timings</p>
          <TimeTable 
            selectedDate={selectedDate} 
            availability={availability} 
            handleAvailabilityChange={handleAvailabilityChange} 
            handleSelectAllChange={handleSelectAllChange}
            handleConfirm={handleConfirm}
          />
        </div>
    </div>
  );
};

const Page = () => {
  return (
    <main>
      <div>
        <Navbar />
      </div>
      <Dashboard />
    </main>
  );
};

export default Page;

