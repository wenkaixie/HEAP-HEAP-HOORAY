import { useState, useEffect } from 'react';
import Navbar from "@/app/components/instructorNavbar/navbar";
import './page.css';
import '@/app/components/background/background.css'
import '@/app/components/dashboard/dashboard.css'
import axios from 'axios';
import { url } from '../../src/app/firebase/firebase_config';

const Dashboard = () => {
  const [bookingsData, setBookingsData] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  const fetchBookingsData = async () => {
  try {
      const userDocID = localStorage.getItem('userDocID');
      if (!userDocID) {
      throw new Error('User document ID not found in localStorage');
      }
      const response = await axios.get(`${url}/instructors/homepage/?id=${userDocID}`);
      console.log('API Response:', response.data);
      setBookingsData(response.data);
  } catch (error) {
      setError(error.message);
  }
  };

  const fetchProfileData = async () => {
    try {
        const userDocID = localStorage.getItem('userDocID');
        if (!userDocID) {
        throw new Error('User document ID not found in localStorage');
        }
        const response = await axios.get(`${url}/instructors/profile/?id=${userDocID}`);
        console.log('API Response:', response.data);
        setProfileData(response.data.data);
    } catch (error) {
        setError(error.message);
    }
    };

  useEffect(() => {
    fetchBookingsData();
    fetchProfileData();
  }, []);

  if (!bookingsData) {
      return null;
  }

  const renderBookings = () => {
    const cards = [];
    bookingsData.upcomingLessons.sort((a, b) => a.timeslots - b.timeslots);
    for (let i = 0; i < bookingsData.upcomingLessons.length; i++) {
      if (i >= 3) {
        break;
      }
      cards.push(
        <LessonCard
          key={i}
          studentName={bookingsData.upcomingLessons[i].studentName}
          lesson={bookingsData.upcomingLessons[i].timeslot}
          lessonDuration={profileData.lessonDuration}
        />
      );
    }
  
    return (
      <div className="dashboard-details">
        {error ? (
          <p>{error}</p>
        ) : bookingsData.upcomingLessons.length > 0 ? (
          cards
        ) : (
          <p>No upcoming bookings</p>
        )}
      </div>
    );
  };

    return (
      <div className="dashboard">
        <div className="dashboard-container">
          <h2 className='title'>Upcoming Bookings</h2>
          <div className="dashboard-details">
            {renderBookings()}
          </div>
          <br></br>
          <button href="/instructorStudents" className="book-button" style={{ textDecoration: "none"}}>View All Bookings</button>
        </div>
        <div className='dashboard-container'>
          <div>
            <h2 className='title'>Set Lesson Availablity</h2>
            <p>Edit your available timeslots</p>
            <br></br>
            <button href="/instructorAvailability" className="book-button" style={{ textDecoration: "none"}}>Lesson Availability</button>
          </div>
          <br></br>
          <br></br>
          <div>
            <h2 className='title'>My Profile</h2>
            <p>View and edit your profile info</p>
            <br></br>
            <button href="/instructorProfile" className="book-button" style={{ textDecoration: "none"}}>Manage Account</button>
          </div>
        </div>
      </div>
    );
  };
  

  const LessonCard = ({ studentName, lesson, lessonDuration }) => {
    const startDate = new Date(lesson);
    const endDate = new Date(startDate.getTime() + lessonDuration * 60 * 60 * 1000);
  
    const formattedStartDate = startDate.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  
    const formattedStartTime = startDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  
    const formattedEndTime = endDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  
    return (
      <div className='card'>
        <div className="card-content">
          <h2 style={{ fontSize: '25px' }}>Practical Lesson ({studentName})</h2>
          <br></br>
          <div className="card-details">
            <p>{formattedStartDate}</p>
            <p>{formattedStartTime} - {formattedEndTime}</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default function Page() {
    return (
      <main>
        <div>
          <Navbar />
        </div>
        <Dashboard />
      </main>
    );
  }