"use client";

import React, { useState } from 'react';
import Navbar from "@/app/components/navbar/navbar";
import './page.css';
import '../../components/dashboard/dashboard.css';
import '../../components/card/card.css';
import '../../components/background/background.css';

const Dashboard = () => {
  const renderContent = () => {
    return (
      <div className="dashboard-details">
        <div>
          <CardManual1 />
          <CardManual3 />
          <CardManual5 />
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-container">
        <h2>Private Instructors</h2>
        <div>Class 3 Instructors</div>
        {renderContent()}
      </div>
    </div>
  );
};

const CardManual1 = () => {
  return (
    <div className="card">
      <div className="card-container">
        <div className="details-container">
          <h2>Chua Im Hua</h2>
          <div className="profile-container">
            <div className="profile-picture-container">
              <img src="profile.jpg" className="profile-picture" alt="Profile" />
            </div>
          </div>
          <div>
            <span>Enrollment Fee: $100</span>
            <span>Lesson Fee: $80</span>
          </div>
          <button className="book-button">View Details</button>
        </div>
      </div>

      <div className="inner-card-container">
        <CardManual2 />
      </div>
    </div>
  );
};

const CardManual2 = () => {
  return (
    <div className="inner-card">
      <span>Lesson Duration: 1.5 Hours</span>
      <span>Location: Sengkang, Hougang</span>
      <span>Remaining Slots: 6</span>
      <span>Pass Rate: 81%</span>
    </div>
  );
};

const CardManual3 = () => {
  return (
    <div className="card">
      <div className="card-container">
        <div className="details-container">
          <h2>Seow Eng Wah</h2>
          <div className="profile-container">
            <div className="profile-picture-container">
              <img src="profile.jpg" className="profile-picture" alt="Profile" />
            </div>
          </div>
          <div>
            <span>Enrollment Fee: $110</span>
            <span>Lesson Fee: $55</span>
          </div>
          <button className="book-button">View Details</button>
        </div>
      </div>

      <div className="inner-card-container">
        <CardManual4 />
      </div>
    </div>
  );
};

const CardManual4 = () => {
  return (
    <div className="inner-card">
      <span>Lesson Duration: 1 Hour</span>
      <span>Location: Changi, Tampines</span>
      <span>Remaining Slots: 2</span>
      <span>Pass Rate: 39%</span>
    </div>
  );
};

const CardManual5 = () => {
  return (
    <div className="card">
      <div className="card-container">
        <div className="details-container">
          <h2>Poh Hang Fong</h2>
          <div className="profile-container">
            <div className="profile-picture-container">
              <img src="profile.jpg" className="profile-picture" alt="Profile" />
            </div>
          </div>
          <div>
            <span>Enrollment Fee: $90</span>
            <span>Lesson Fee: $60</span>
          </div>
          <button className="book-button">View Details</button>
        </div>
      </div>

      <div className="inner-card-container">
        <CardManual6 />
      </div>
    </div>
  );
};

const CardManual6 = () => {
  return (
    <div className="inner-card">
      <span>Lesson Duration: 1 Hour</span>
      <span>Location: TBC</span>
      <span>Remaining Slots: 3</span>
      <span>Pass Rate: 54%</span>
    </div>
  );
};

export default Dashboard;
