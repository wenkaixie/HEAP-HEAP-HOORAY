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
        <div className='calendar'>
          <DateCalendar
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            minDate={dayjs()}
            className="custom-date-calendar"
            defaultValue={null}
          /> 
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default DateSelector;
