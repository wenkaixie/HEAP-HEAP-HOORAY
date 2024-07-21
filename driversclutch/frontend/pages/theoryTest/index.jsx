"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '@/app/components/navbar/navbar';
import DateSelector from './DateSelector';
import TimeSlots from './TimeSlots';
import BookingSummary from './BookingSummary';
import dayjs from 'dayjs';
import './page.css';
import '@/app/components/background/background.css';
import '@/app/components/dashboard/dashboard.css';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { url } from '../../src/app/firebase/firebase_config';
import { GiCancel } from "react-icons/gi";
import { SiTicktick } from "react-icons/si";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

const Dashboard = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [timeslots, setTimeslots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [error, setError] = useState(null);
    const [studentData, setStudentData] = useState(null);
    const [price, setPrice] = useState(5.45);
    const [loading, setLoading] = useState(false);

    const [creditBalance, setCreditBalance] = useState(0);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [balanceData, setBalanceData] = useState(null);

    const handleDateChange = async (date) => {
        setSelectedDate(date);
        setLoading(true);
        // Format the date for the backend
        // For this, only taking in the month and day
        const month = date.format('MMM').toUpperCase();
        const day = date.date();

        try {
            const response = await axios.get(`${url}/webscraping/make-booking`, {
                params: { month: `${month}'24`, date: day }
            });
            setTimeslots(response.data.availableSlots);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching timeslots:', error);
            setError('Failed to fetch timeslots');
            setLoading(false);
        }
    };


    // fetch timeslots:
    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const userDocID = localStorage.getItem('userDocID');
                if (!userDocID) {
                    throw new Error('User document ID not found in localStorage');
                }
                console.log(`Fetching student data for userDocID: ${userDocID}`);
                const response = await axios.get(`${url}/students/booking/?id=${userDocID}`);
                console.log('API Response:', response.data);
                setStudentData(response.data);
            } catch (error) {
                console.error('Error fetching student data:', error);
                setError(error.message);
            }
        };

        fetchStudentData();
    }, []);

    useEffect(() => {
        if (studentData) {

        }
    }, [studentData]);

    // Possible to replace top with this
    // useEffect(() => {
    //   if (studentData) {
    //     const dateStr = selectedDate.format("YYYY-MM-DD");
    //     const dataForDate = studentData[dateStr];

    //     if (dataForDate) {
    //       setTimeslots(dataForDate);
    //     } else {
    //       setTimeslots([]);
    //     }
    //   }
    // }, [selectedDate, studentData]);

    const handleAddBooking = (slot) => {
        setSelectedSlot(slot);
    };

    // fetch balance
    useEffect(() => {
        const fetchBalanceData = async () => {
            try {
                const userDocID = localStorage.getItem('userDocID');
                if (!userDocID) {
                    throw new Error('User document ID not found in localStorage');
                }
                console.log(`Fetching student data for userDocID: ${userDocID}`);
                const response = await axios.get(`${url}/students/balance/?id=${userDocID}`);
                console.log('API Response:', response.data);
                setBalanceData(response.data);
            } catch (error) {
                console.error('Error fetching student data:', error);
                setError(error.message);
            }
        };

        fetchBalanceData();
    }, []);


    useEffect(() => {
        if (balanceData) {
            setCreditBalance(balanceData.balance);
        }
    })


    const handleNextStep = async () => {
        if (creditBalance >= price) {
            await updateDatabase();
        }
    }

    // if (!selectedDate || !selectedSlot) {
    //     alert('Please select a date and time slot before confirming the booking.');
    //     return;
    // }

    // const handleNextStep = () => {
    //   // all of the below can refer to paymentBooking index.jsx
    //   // deduct from balance (i need to fetch balance too)
    //   // send booking details to backend
    //   // show a popup screen to show that booking confirmed (only when data is successfully sent) 
    //   // when i click the close button, user returns back to the refreshed theory page (and hopefully there is a note below the timeslots that writes that the user has already took the test)
    // };
    const updateDatabase = async () => {
        const remainingBalance = creditBalance - price;
        try {
            const response = await axios.post(`${url}/webscraping/confirm-booking`, {
                date: selectedDate.format('YYYY-MM-DD'),
                slot: selectedSlot,
                // change the name????
                balance : remainingBalance
            });

            if (response.data.status === 'success') {
                setCreditBalance(remainingBalance);
                setIsPopupVisible(true);
                alert('Booking confirmed successfully');
            } else {
                alert('Failed to confirm booking');
            }
        } catch (error) {
            console.error('Error confirming booking:', error);
            alert('Failed to confirm booking');
        }
    };

    const closePopup = () => {
        setIsPopupVisible(false);
        window.location.href = "./theoryTest";
    };


    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!studentData) {
        console.log('No student data found.');
        return <div>Loading...</div>;
    }
    return (
        <div className='dashboard'>
            <div className='title'>
                <h2>Theory Test Booking</h2>
            </div>
            <div className="dashboard-container">
                <p>Centre: Bukit Batok Driving Centre</p>
                <DateSelector selectedDate={selectedDate} setSelectedDate={handleDateChange} />
            </div>
            <div className="dashboard-container">
                <p>Test Time Slots Available</p>
                <TimeSlots
                    timeslots={timeslots}
                    selectedDate={selectedDate}
                    loading={loading}
                    handleAddBooking={handleAddBooking}
                    handleNextStep={handleNextStep}
                    selectedSlot={selectedSlot}
                />
            </div>
            <div className="dashboard-container">
                <div className='right'>
                    <p>Booking Summary</p>
                    <BookingSummary
                        selectedDate={selectedDate}
                        selectedTimeslot={selectedSlot}
                        handleNextStep={handleNextStep}
                        price={price}
                        creditBalance={creditBalance}
                    />
                </div>
            </div>
            {isPopupVisible && (
                <div id="popupOverlay" className="popup-overlay show">
                    <div className="popup-box">
                        <strong>Payment Confirmed</strong>
                        <GiCancel className='button' onClick={closePopup} />
                        <br /><br /><SiTicktick className="tick" />
                    </div>
                </div>
            )}
        </div>
    );
};

const BookingPage = () => {
    return (
        <main>
            <Navbar />
            <Dashboard />
        </main>
    );
};

export default BookingPage;
