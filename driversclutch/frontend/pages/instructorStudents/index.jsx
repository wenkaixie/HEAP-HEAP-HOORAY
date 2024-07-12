
import { useState, useEffect } from 'react';
import Navbar from "@/app/components/instructorNavbar/navbar";
import './page.css';
import '@/app/components/card/card.css';
import '@/app/components/background/background.css';
import '@/app/components/dashboard/dashboard.css';
import Image from 'next/image';
import axios from 'axios';

const Dashboard = () => {
    const [studentsData, setStudentsData] = useState(null);
    const [error, setError] = useState(null);

    const fetchStudentsData = async () => {
      try {
        const userDocID = localStorage.getItem('userDocID');
        if (!userDocID) {
          throw new Error('User document ID not found in localStorage');
        }
        const response = await axios.get(`http://localhost:8001/instructors/studentList/?id=${userDocID}`);
        console.log('API Response:', response.data);
        setStudentsData(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    useEffect(() => {
      fetchStudentsData();
    }, []);

    const renderContent = () => {
      const cards = [];
      for (let i = 0; i < studentsData.length; i++) {
        cards.push(<Card student={studentsData[i]} />);
      }
  
      return (
        <div className="dashboard-details">
          {error ? (
            <p>{error}</p>
          ) : (
            studentsData.length > 0 ? (
              cards
            ) : (
              <p>Loading...</p>
            )
          )}
        </div>
      );
    };

    if (!studentsData) {
      return null;
    }

    return (
      <div className="dashboard">
        <div className="dashboard-container">
          <h2>My Students</h2>
          <div className="dashboard-details">
            <div>
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const Card = ({ student }) => {
    return (
      <div className="card">
        <h3>{student.studentName}</h3>
        <div className="card-details">
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