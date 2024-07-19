
import { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Navbar from "@/app/components/navbar/navbar";
import './page.css';
import '@/app/components/background/background.css';
import axios from 'axios';

const Dashboard = () => {
  const [bookingsData, setBookingsData] = useState(null);
  const [error, setError] = useState(null);
  const [showUpcoming, setShowUpcoming] = useState(true);
  const [showCompleted, setShowCompleted] = useState(false);

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

  const renderUpcomingBookings = () => {
    const cards = [];
    bookingsData.upcomingLessons.sort();
    for (let i = 0; i < bookingsData.upcomingLessons.length; i++) {
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

  const renderCompletedBookings = () => {
    const cards = [];
    bookingsData.completedLessons.sort();
    for (let i = 0; i < bookingsData.completedLessons.length; i++) {
      cards.push(<LessonCard key={i} index={i} lesson={bookingsData.completedLessons[i]} lessonDuration={bookingsData.lessonDuration} />);
    }

    return (
      <div className="dashboard-details">
        {error ? (
          <p>{error}</p>
        ) : (
          bookingsData.completedLessons.length > 0 ? (
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
        <h2>My Bookings</h2>
        <br></br>
        <h2 onClick={() => setShowUpcoming(!showUpcoming)} style={{ cursor: 'pointer', fontSize: '25px' }}>
          Upcoming Bookings ({bookingsData.upcomingLessons.length}) {showUpcoming ? <FaChevronUp /> : <FaChevronDown />}
        </h2>
        <div className="dashboard-details">
          {showUpcoming && renderUpcomingBookings()}
        </div>
        <br></br>
        <h2 onClick={() => setShowCompleted(!showCompleted)} style={{ cursor: 'pointer', fontSize: '25px' }}>
          Completed Bookings ({bookingsData.completedLessons.length}) {showCompleted ? <FaChevronUp /> : <FaChevronDown />}
        </h2>
        <div className="dashboard-details">
          {showCompleted && renderCompletedBookings()}
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