"use client";
import React, { useState } from 'react';
import Navbar from '@/app/components/instructorNavbar/navbar';
import DateSelector from './DateSelector';
import TimeTable from './Timetable';
import './page.css';
import dayjs from 'dayjs';
import '@/app/components/background/background.css';
import '@/app/components/dashboard/dashboard.css';
import { GiCancel } from "react-icons/gi";
import { SiTicktick } from "react-icons/si";
import axios from 'axios'; // Import axios

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

  // Convert availability to required format
  const convertToRequiredFormat = (availability) => {
    const datetimes = [];
    for (const [date, times] of Object.entries(availability)) {
      times.forEach(time => {
        const datetime = dayjs(`${date} ${time}`, 'YYYY-MM-DD hh:mm A').toISOString();
        datetimes.push(datetime);
      });
    }
    return datetimes;
  };

  const updateDatabase = async () => {

  try {
    const userDocID = localStorage.getItem('userDocID');
    const formattedData = convertToRequiredFormat(availability);
    console.log(userDocID);
    console.log(formattedData);
    const requestData = {
      instructorID: userDocID,
      datetimes: formattedData
    };

    console.log("Sending data to server:", requestData); // Log the request data

    const response = await axios.post('http://localhost:8001/instructors/availability', requestData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      console.log("Availability data successfully sent to the database.");
    } else {
      console.error("Failed to send availability data.");
    }
  } catch (error) {
    console.error("Error:", error);
    if (error.response) {
      console.error("Server responded with:", error.response.data);
    }
  }
};

  const handleConfirm = async () => {
    await updateDatabase();
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
            <strong>Availability Confirmed</strong>
            <GiCancel className='button' onClick={closePopup} />
            <br /><br /><SiTicktick className="tick" />
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
