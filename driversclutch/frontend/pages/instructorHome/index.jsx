import { useState, useEffect } from 'react';
import Navbar from "@/app/components/instructorNavbar/navbar";
import './page.css';
import '@/app/components/background/background.css'
import '@/app/components/dashboard/dashboard.css'
import axios from 'axios';
import Link from "next/link";

const Dashboard = () => {
  const [bookingsData, setBookingsData] = useState(null);
  // const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  const fetchBookingsData = async () => {
  try {
      const userDocID = localStorage.getItem('userDocID');
      if (!userDocID) {
      throw new Error('User document ID not found in localStorage');
      }
      const response = await axios.get(`http://localhost:8001/instructors/homepage/?id=${userDocID}`);
      console.log('API Response:', response.data);
      setBookingsData(response.data);
  } catch (error) {
      setError(error.message);
  }
  };

  // const fetchProfileData = async () => {
  //   try {
  //       const userDocID = localStorage.getItem('userDocID');
  //       if (!userDocID) {
  //       throw new Error('User document ID not found in localStorage');
  //       }
  //       const response = await axios.get(`http://localhost:8001/students/profile/?id=${userDocID}`);
  //       console.log('API Response:', response.data);
  //       setProfileData(response.data.data);
  //   } catch (error) {
  //       setError(error.message);
  //   }
  //   };

  useEffect(() => {
    fetchBookingsData();
    // fetchProfileData();
  }, []);

  if (!bookingsData) {
      return null;
  }

  const renderBookings = () => {
    const cards = [];
    bookingsData.upcomingLessons.sort();
    for (let i = 0; i < bookingsData.upcomingLessons.length; i++) {
      if (i >= 3) {
        break;
      }
      cards.push(<LessonCard key={i} index={i + bookingsData.lessonCount} lesson={bookingsData.upcomingLessons[i]} lessonDuration={bookingsData.lessonDuration} />);
    }

    return (
      <div className="dashboard-details">
        {error ? (
          <p>{error}</p>
        ) : (
          bookingsData.upcomingLessons.length > 0 ? (
            cards
          ) : (
            <p>Loading...</p>
          )
        )}
      </div>
    );
  };

    return (
      <div className="dashboard">
        <div className="dashboard-container">
          <h2>Calendar</h2>
          <p>Use this area to describe one of your services.</p>
          <div className="dashboard-details">
            <span>1 hr</span>
            <span>$70</span>
          </div>
          <button className="book-button">Book Now</button>
        </div>
        <div className="dashboard-container">
          <h2>Upcoming Bookings</h2>
          <div className="dashboard-details">
            <div>
              <Card1 />
              <Card2 />
              <Card3 />
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const Card1 = () => {
    return (
      <div className="card">
        <h3>Practical Driving Lesson (4)</h3>
        <div className="card-details">
          <span>8 Oct 2024</span>
          <h3>1900H - 2100H</h3>
        </div>
        <button className="book-button">View Details</button>
      </div>
    );
  };
  
  const Card2 = () => {
    return (
      <div className="card">
        <h3>Practical Driving Lesson (5)</h3>
        <div className="card-details">
          <span>10 Oct 2024</span>
          <h3>1900H - 2100H</h3>
        </div>
        <button className="book-button">View Details</button>
      </div>
    );
  };
  
  const Card3 = () => {
    return (
      <div className="card">
        <h3>Practical Driving Lesson (6)</h3>
        <div className="card-details">
          <span>12 Oct 2024</span>
          <h3>1900H - 2100H</h3>
        </div>
        <button className="book-button">View Details</button>
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