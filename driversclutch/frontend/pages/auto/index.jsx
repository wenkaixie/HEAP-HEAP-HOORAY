"use client";

import React, { useState, useEffect } from 'react';
import Navbar from "@/app/components/navbar/navbar";
import axios from 'axios';
import './page.css';
import '@/app/components/card/card.css';
import '@/app/components/background/background.css';
import '@/app/components/dashboard/dashboard.css';

const Dashboard = () => {
  const [instructors, setInstructors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await axios.get('http://localhost:8001/students/privateInstructors/auto');
        console.log('API Response:', response.data);
        setInstructors(response.data.data);
      } catch (error) {
        console.error('Error fetching instructors:', error);
        setError(`Network Error: ${error.message}`);
      }
    };

    fetchInstructors();
  }, []);

  const renderContent = () => {
    const cards = instructors.map((instructor, index) => (
      <CardAuto key={index} instructor={instructor} />
    ));

    return (
      <div className="dashboard-details">
        {error ? (
          <p>{error}</p>
        ) : (
          instructors.length > 0 ? (
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
      <Navbar />
      <div className="dashboard-container">
        <h2>Private Instructors</h2>
        <div className="instructor-class" style ={{fontSize: '18px'}}>Class 3A Instructors</div>
        {renderContent()}
      </div>
    </div>
  );
};

const CardAuto = ({ instructor }) => {
  return (
    <div className="card">
      <div className="card-container">
        <div className="details-container">
          <h3 className="instructor-name" style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {instructor.firstName} {instructor.lastName}
          </h3>
          <div className="profile-container">
            <div className="profile-picture-container">
              <img src="profile.jpg" className="profile-picture" alt="Profile" />
            </div>
          </div>
          <div>
            <span>Enrolment Fee: ${instructor.enrolmentFee}</span>
            <span>Lesson Fee: ${instructor.lessonFee}</span>
            <br />
          </div>
        </div>
        <button className="book-button" style={{ fontSize: '15px'}}>View Details</button>
      </div>
      <div className="inner-card-container">
        <CardAutoDetails instructor={instructor} />
      </div>
    </div>
  );
};



const CardAutoDetails = ({ instructor }) => {
  return (
    <div className="inner-card">
      <span>Lesson Duration: {instructor.lessonDuration} Hours</span>
      <span>Location: {instructor.locations.join(', ')}</span>
      <span>Remaining Slots: {instructor.remainingSlots}</span>
      <span>Pass Rate: {instructor.passRate}</span>
    </div>
  );
};

export default Dashboard;
