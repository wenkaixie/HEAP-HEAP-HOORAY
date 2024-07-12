
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

  useEffect(() => {
      const fetchBookingsData = async () => {
      try {
          const userDocID = localStorage.getItem('userDocID');
          if (!userDocID) {
          throw new Error('User document ID not found in localStorage');
          }
          const response = await axios.get(`http://localhost:8001/students/homepage/lessons/?studentID=Ua4LOcd1bRmwKBeTleej`);
          console.log('API Response:', response.data);
          setBookingsData(response.data);
      } catch (error) {
          setError(error.message);
      }
      };

      fetchBookingsData();
  }, []);


  if (!bookingsData) {
      return null;
  }

  // const renderContent = () => {
  //   const cards = [];
  //   for (let i = 0; i < bookingsData.length; i++) {
  //     cards.push(<CardManual key={i} booking={bookingsData[i]} />);
  //   }

  //   return (
  //     <div className="dashboard-details">
  //       {error ? (
  //         <p>{error}</p>
  //       ) : (
  //         bookingsData.length > 0 ? (
  //           cards
  //         ) : (
  //           <p>Loading...</p>
  //         )
  //       )}
  //     </div>
  //   );
  // };

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <h2>Upcoming Bookings</h2>
        <div className="dashboard-details">
          {bookingsData.upcomingLessons && bookingsData.upcomingLessons.length > 0 ? (
            bookingsData.upcomingLessons.map((lesson, index) => (
              <LessonCard key={index} lesson={lesson} />
            ))
          ) : (
            <p>No upcoming lessons.</p>
          )}
        </div>
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


const LessonCard = ({ lesson }) => {
  return (
    <div className="card">
      <div className="card-content">
        <h3>{lesson.title}</h3>
        <div className="card-details">
          <span>{lesson.date}</span>
          <h3>{lesson.time}</h3>
        </div>
        <button className="book-button">View Details</button>
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