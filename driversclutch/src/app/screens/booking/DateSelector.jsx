// DateSelector.jsx
"use client";
import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';

const DateSelector = ({ selectedDate, setSelectedDate }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="date-selector">
        <p>Booking for : INSTRUCTOR'S NAME</p> {/*insert instructor's name variable */}
        <div className='calendar'>
           <DateCalendar
          value={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          minDate={dayjs()}
        /> 
        </div>
        
      </div>
    </LocalizationProvider>
  );
};

export default DateSelector;

