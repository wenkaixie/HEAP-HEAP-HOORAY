
import { useState, useEffect } from 'react';
import Navbar from "@/app/components/navbar/navbar";
import './page.css';
import '@/app/components/card/card.css';
import '@/app/components/background/background.css';
import '@/app/components/dashboard/dashboard.css';
import Image from 'next/image';
import axios from 'axios';

const Dashboard = () => {
  const [bookingsData, setBookingsData] = useState(null);
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

  useEffect(() => {
    fetchBookingsData();
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
        <button className="book-button">View All Bookings</button>
      </div>
      <div className="dashboard-container">
        <div>
          <h2>Make a New Booking</h2>
          <p>Book a Practical Lesson</p>
          <button className="book-button">Book Now</button>
        </div>
        <br></br>
        <div>
          <h2>Make a new booking</h2>
          <p>Use this area to describe one of your services.</p>
          <div className="dashboard-details">
            <span>1 hr</span>
            <span>$70</span>
          </div>
          <button className="book-button">Book Now</button>
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
          <h3>{formattedStartDate}</h3>
          <h3>{formattedStartTime} - {formattedEndTime}</h3>
        </div>
      </div>
      <div className="card-content card-image">
        <Image
          src='/assets/practical-driving.png'
          width={100}
          height={100}
        />
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