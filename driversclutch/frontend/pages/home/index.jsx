
import { useState, useEffect } from 'react';
import Navbar from "@/app/components/navbar/navbar";
import './page.css';
import '@/app/components/background/background.css';
import axios from 'axios';
import Link from "next/link";
import { url } from '../../src/app/firebase/firebase_config';


const Dashboard = () => {
  const [bookingsData, setBookingsData] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [testData, setTestData] = useState(null);
  const [error, setError] = useState(null);

  const fetchBookingsData = async () => {
    try {
        const userDocID = localStorage.getItem('userDocID');
        if (!userDocID) {
        throw new Error('User document ID not found in localStorage');
        }
        const response = await axios.get(`${url}/students/homepage/lessons/?studentID=${userDocID}`);
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
        const response = await axios.get(`${url}/students/profile/?id=${userDocID}`);
        console.log('API Response:', response.data);
        setProfileData(response.data.data);
    } catch (error) {
        setError(error.message);
    }
    };

  const fetchTestData = async () => {
    try {
        const userDocID = localStorage.getItem('userDocID');
        if (!userDocID) {
        throw new Error('User document ID not found in localStorage');
        }
        const response = await axios.get(`${url}/students/homepage/lessons/?studentID=${userDocID}`);
        console.log('API Response:', response.data);
        // setTestData(response.data);
    } catch (error) {
        setError(error.message);
    }
  };

  useEffect(() => {
    fetchBookingsData();
    fetchProfileData();
    fetchTestData();
  }, []);

  if (!profileData) {
      return null;
  }

  const renderBookings = () => {
    if (!bookingsData) {
      return <p>No Lessons Booked</p>
    };
    const cards = [];
    bookingsData.upcomingLessons.sort();
    for (let i = 0; i < bookingsData.upcomingLessons.length; i++) {
      if (i >= 3) {
        break;
      }
      cards.push(
        <LessonCard
          key={i}
          index={i + bookingsData.lessonCount}
          lesson={bookingsData.upcomingLessons[i]}
          lessonDuration={bookingsData.lessonDuration}
        />
      );
    }
  
    return (
      <div className="home-dashboard-details">
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

  const renderTestBookings = () => {
    if (!testData) {
      return <p>No Tests Booked</p>
    };
    const cards = [];
    testData.upcomingLessons.sort();
    for (let i = 0; i < bookingsData.upcomingLessons.length; i++) {
      if (i >= 3) {
        break;
      }
      cards.push(
        <LessonCard
          key={i}
          index={i + bookingsData.lessonCount}
          lesson={bookingsData.upcomingLessons[i]}
          lessonDuration={bookingsData.lessonDuration}
        />
      );
    }
  
    return (
      <div className="home-dashboard-details">
        {error ? (
          <p>{error}</p>
        ) : bookingsData.upcomingLessons.length > 0 ? (
          cards
        ) : (
          <p>No upcoming theory test bookings</p>
        )}
      </div>
    );
  };

  return (
    <div className="home-dashboard">
      <div className="home-dashboard-container">
        <div>
          <h2>Upcoming Lessons</h2>
          <div className="home-dashboard-details">
            {renderBookings()}
          </div>
          <br></br>
          <Link href="/bookingList" className="home-book-button" style={{ textDecoration: "none"}}>View All Lesson Bookings</Link>
        </div>
        <br></br>
        <br></br>
        <div>
          <h2>Upcoming Theory Tests</h2>
          <div className='home-dashboard-details'>
            {renderTestBookings()}
          </div>
        </div>
      </div>
      <div className="home-dashboard-container">
        <div>
          <h2>Make a New Booking</h2>
          <p>Book a practical lesson</p>
          <br></br>
          <Link href="/booking" className="home-book-button" style={{ textDecoration: "none"}}>Book Now</Link>
        </div>
        <br></br>
        <br></br>
        <div>
          <h2>Theory Practice</h2>
          <p>Test your knowledge with a mock theory test</p>
          <br></br>
          <Link href="/btt" className="home-book-button" style={{ textDecoration: "none"}}>Theory Practice</Link>
        </div>
        <br></br>
        <br></br>
        <div>
          <h2>Top-up Credit Balance</h2>
          <p>Credit Balance: {profileData.balance}</p>
          <br></br>
          <Link href="/balance" className="home-book-button" style={{ textDecoration: "none"}}>Top-up Now</Link>
        </div>
        <br></br>
        <br></br>
        <div>
          <h2>Manage Profile</h2>
          <p>View and edit your profile</p>
          <br></br>
          <Link href="/profile" className="home-book-button" style={{ textDecoration: "none"}}>Manage Profile</Link>
        </div>
      </div>
    </div>
  );
};


const LessonCard = ({ index, lesson, lessonDuration }) => {
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
    <div className='home-card'>
      <div className="home-card-content">
        <h2 style={{ fontSize: '25px' }}>Practical Lesson {index + 1}</h2>
        <br></br>
        <div className="home-card-details">
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