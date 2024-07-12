
import { useState, useEffect } from 'react';
import Navbar from "@/app/components/instructorNavbar/navbar";
import './page.css';
import '@/app/components/card/card.css';
import '@/app/components/background/background.css'
import '@/app/components/dashboard/dashboard.css'
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
            const response = await axios.get(`http://localhost:8001/students/bookings/?id=${userDocID}`);
            console.log('API Response:', response.data);
            setBookingsData(response.data.data);
        } catch (error) {
            setError(error.message);
        }
        };

        fetchBookingsData();
    }, []);

    if (!bookingsData) {
        return null;
    }

    return (
      <div className="dashboard">
        <div className="dashboard-container">
          <h2>Upcoming Bookings</h2>
          <div className="dashboard-details">
            <div>
              <Card1 />
              <Card2 />
              <Card3 />
            </div>
          </div>
          <h2>Past Bookings</h2>
        </div>
      </div>
    );
  };
  
  const Card1 = () => {
    return (
      <div className="card">
        <h3>Thomas Lin</h3>
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
        <h3>Samual Low</h3>
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
        <h3>Richard Tan</h3>
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