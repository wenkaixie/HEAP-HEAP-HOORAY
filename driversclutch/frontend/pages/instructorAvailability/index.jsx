"use client";
import React, { useState } from 'react';
import Navbar from '@/app/components/instructorNavbar/navbar';
import DateSelector from './DateSelector';
import TimeTable from './Timetable';
import './page.css';
import dayjs from 'dayjs';
import '@/app/components/background/background.css'
import '@/app/components/dashboard/dashboard.css'
import { GiCancel } from "react-icons/gi";
import { SiTicktick } from "react-icons/si";

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [availability, setAvailability] = useState({});
  const [isPopupVisible, setIsPopupVisible] = useState(false);

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

  const updateDatabase = async () => {
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
  

  const handleConfirm = async () => {
    // await updateDatabase();
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
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
        {isPopupVisible && (
        <div id="popupOverlay" className="popup-overlay show">
          <div className="popup-box">
            <strong>Availabilty Confirmed</strong>
            <GiCancel className='button' onClick={closePopup} />
            <br /><br /><SiTicktick className="tick"/>
          </div>
        </div>
      )}
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

