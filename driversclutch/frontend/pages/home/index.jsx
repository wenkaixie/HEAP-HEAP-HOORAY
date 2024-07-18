
import { useState, useEffect } from 'react';
import Navbar from "@/app/components/navbar/navbar";
import './page.css';
import '@/app/components/background/background.css'
import Image from 'next/image';
import axios from 'axios';
import Link from "next/link";


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
      const response = await axios.get(`http://localhost:8001/students/homepage/lessons/?studentID=${userDocID}`);
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
        const response = await axios.get(`http://localhost:8001/students/profile/?id=${userDocID}`);
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

  if (error) {
    return <p>{error}</p>;
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
        <h2>Upcoming Bookings</h2>
        <div className="dashboard-details">
          {renderBookings()}
        </div>
        <Link href="/bookingList" className="book-button" style={{ textDecoration: "none"}}>View All Bookings</Link>
      </div>
      <div className="dashboard-container">
        <div>
          <h2>Make a New Booking</h2>
          <p>Book a practical lesson</p>
          <Link href="/booking" className="book-button" style={{ textDecoration: "none"}}>Book Now</Link>
        </div>
        <br></br>
        <br></br>
        <div>
          <h2>Theory Practice</h2>
          <p>Test your knowledge with a mock theory test</p>
          <Link href="/btt" className="book-button" style={{ textDecoration: "none"}}>Theory Practice</Link>
        </div>
        <br></br>
        <br></br>
        <div>
          <h2>Top-up Credit Balance</h2>
          <p>Credit Balance: {profileData.balance}</p>
          <Link href="/balance" className="book-button" style={{ textDecoration: "none"}}>Top-up Now</Link>
        </div>
        <br></br>
        <br></br>
        <div>
          <h2>Manage Profile</h2>
          <p>View and edit your profile</p>
          <Link href="/profile" className="book-button" style={{ textDecoration: "none"}}>Manage Profile</Link>
        </div>
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
      {/* <div className="card-content card-image">
        <Image
          src='/assets/practical-driving.png'
          width={100}
          height={100}
        />
      </div> */}
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