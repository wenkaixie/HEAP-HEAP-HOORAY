"use client";
import React, { useState, useCallback, useMemo, lazy, Suspense } from 'react';
import dynamic from 'next/dynamic'; // For dynamically importing components
import './page.css';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import axios from 'axios'; // Import axios
import { url } from '../../src/app/firebase/firebase_config';

// Dynamically import components
const Navbar = dynamic(() => import('@/app/components/instructorNavbar/navbar'));
const DateSelector = lazy(() => import('./DateSelector'));
const TimeTable = lazy(() => import('./Timetable'));

dayjs.extend(utc);
dayjs.extend(timezone);

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [availability, setAvailability] = useState({});
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleAvailabilityChange = useCallback((date, time) => {
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
  }, [availability]);

  const handleSelectAllChange = useCallback((date, times, isChecked) => {
    const dateKey = date.format('YYYY-MM-DD');
    const newAvailability = { ...availability };

    if (isChecked) {
      newAvailability[dateKey] = times;
    } else {
      newAvailability[dateKey] = [];
    }

    setAvailability(newAvailability);
  }, [availability]);

  const convertToRequiredFormat = useCallback((availability) => {
    const timeZone = 'Asia/Singapore'; // Define the desired time zone
    const datetimes = [];

    for (const [date, times] of Object.entries(availability)) {
      times.forEach(time => {
        const dateTimeString = `${date} ${time}`;
        const parsedDate = dayjs.tz(dateTimeString, 'YYYY-MM-DD hh:mm A', timeZone);
        const isoString = parsedDate.toISOString();
        datetimes.push(isoString);
      });
    }
    return datetimes;
  }, []);

  const updateDatabase = async () => {
    try {
      const userDocID = localStorage.getItem('userDocID');
      const formattedData = convertToRequiredFormat(availability);
      const requestData = {
        instructorID: userDocID,
        datetimes: formattedData
      };

      const response = await axios.post(`${url}/instructors/availability`, requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.status === 200) {
        setIsPopupVisible(true);
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

  const closePopup = useCallback(() => {
    setIsPopupVisible(false);
  }, []);

  return (
    <div className='dashboard'>
      <div className='title'>
        <h2>Lesson Availability</h2>
      </div>
      <div className="dashboard-container">
        <p>Select a date</p>
        <Suspense fallback={<div>Loading...</div>}>
          <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </Suspense>
      </div>
      <div className="dashboard-container">
        <p>Select Your Unavailable Timings</p>
        <Suspense fallback={<div>Loading...</div>}>
          <TimeTable
            selectedDate={selectedDate}
            availability={availability}
            handleAvailabilityChange={handleAvailabilityChange}
            handleSelectAllChange={handleSelectAllChange}
            handleConfirm={handleConfirm}
          />
        </Suspense>
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
