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
import { format, isValid, parseISO } from 'date-fns';

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
    const [beforeFormat, setBeforeFormat] = useState(null);
    const [creditBalance, setCreditBalance] = useState(0);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [balanceData, setBalanceData] = useState(null);

    const handleDateChange = async (date) => {
        setSelectedDate(date);
        setLoading(true);
        const month = date.format('MMM').toUpperCase();
        const day = date.date();

        try {
            const response = await axios.get(`http://localhost:8001/webscraping/make-booking`, {
                params: { month: `${month}'24`, date: day }
            });
            setTimeslots(response.data.availableSlots);
        } catch (error) {
            console.error('Error fetching timeslots:', error);
            setError('Failed to fetch timeslots');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const userDocID = localStorage.getItem('userDocID');
                if (!userDocID) {
                    throw new Error('User document ID not found in localStorage');
                }
                const response = await axios.get(`${url}/students/booking/?id=${userDocID}`);
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
            const fetchBalanceData = async () => {
                try {
                    const userDocID = localStorage.getItem('userDocID');
                    if (!userDocID) {
                        throw new Error('User document ID not found in localStorage');
                    }
                    const response = await axios.get(`${url}/students/balance/?id=${userDocID}`);
                    setBalanceData(response.data);
                } catch (error) {
                    console.error('Error fetching balance data:', error);
                    setError(error.message);
                }
            };

            fetchBalanceData();
        }
    }, [studentData]);

    useEffect(() => {
        if (balanceData) {
            setCreditBalance(balanceData.balance);
        }
    }, [balanceData]);

    const handleAddBooking = (slot) => {
        setBeforeFormat(slot);
        const startTime = dayjs(slot.split(' ')[2], 'HH:mm');
        const endTime = startTime.add(45, 'minute');
        const formattedSlot = `${startTime.format('HH:mm')} - ${endTime.format('HH:mm')}`;
        console.log(formattedSlot);
        setSelectedSlot(formattedSlot);
    };

    const handleNextStep = async () => {
        if (creditBalance >= price) {
            await updateDatabase();
        }
    };

    const updateBalance = async () => {
        const remainingBalance = creditBalance - price;
        try {
            const userDocID = localStorage.getItem('userDocID');
            const requestData = {
                studentID: userDocID,
                amount: price,
            };
            const response = await axios.put(`${url}/students/balance/payment`, requestData, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (response.status === 200) {
                setCreditBalance(remainingBalance);
                setIsPopupVisible(true);
            } else {
                console.error("Failed to send balance data.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const updateDatabase = async () => {
        try {
            const userDocID = localStorage.getItem('userDocID');
            const formattedDate = selectedDate ? selectedDate.format('YYYY-MM-DD') : '';
            console.log(userDocID, "--", formattedDate, "--", beforeFormat, "--", selectedSlot);
            const response = await axios.post(`http://localhost:8001/webscraping/confirm-booking-nonscrape`, {
                studentID: userDocID,
                date: formattedDate,
                slot: beforeFormat,
                editedSlot: selectedSlot
            });

            if (response.data.status === 'success') {
                await updateBalance();
            } else {
                alert('Failed to confirm booking');
            }

            await updateBalance();
        } catch (error) {
            console.error('Error confirming booking:', error);
            alert('Failed to confirm booking');
        }
    };

    const closePopup = () => {
        setIsPopupVisible(false);
        window.location.href = "./home";
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!studentData) {
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
