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
    bookingsData.upcomingLessons.sort((a, b) => a.timeslots - b.timeslots);
    console.log(bookingsData.upcomingLessons[1]);
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
          <h2>Upcoming Bookings</h2>
          <div className="dashboard-details">
            {renderBookings()}
          </div>
          <Link href="/bookingList" className="book-button" style={{ textDecoration: "none"}}>View All Bookings</Link>
        </div>
      </div>
    );
  };
  

  const LessonCard = ({ index, lesson, lessonDuration }) => {
    const startDate = new Date(lesson);
    const endDate = new Date(startDate.getTime() + lessonDuration * 60 * 60 * 1000);
  
    const formattedStartDate = startDate.toLocaleDateString('en-US', {
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
          <h2 style={{ fontSize: '25px' }}>Practical Lesson {index + 1}</h2>
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