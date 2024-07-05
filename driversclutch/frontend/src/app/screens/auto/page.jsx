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
          <CardAuto1 />
          <CardAuto3 />
          <CardAuto5 />
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-container">
        <h2>Private Instructors</h2>
        <div>Class 3A Instructors</div>
        {renderContent()}
      </div>
    </div>
  );
};

const CardAuto1 = () => {
  return (
    <div className="card">
      <div className="card-container">
        <div className="details-container">
          <h2>Ng Lai Huat</h2>
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
        <CardAuto2 />
      </div>
    </div>
  );
};

const CardAuto2 = () => {
  return (
    <div className="inner-card">
      <span>Lesson Duration: 1 Hour</span>
      <span>Location: Woodlands, Marsiling</span>
      <span>Remaining Slots: 5</span>
      <span>Pass Rate: 54%</span>
    </div>
  );
};

const CardAuto3 = () => {
  return (
    <div className="card">
      <div className="card-container">
        <div className="details-container">
          <h2>Ng Lian Huat</h2>
          <div className="profile-container">
            <div className="profile-picture-container">
              <img src="profile.jpg" className="profile-picture" alt="Profile" />
            </div>
          </div>
          <div>
            <span>Enrollment Fee: $90</span>
            <span>Lesson Fee: $75</span>
          </div>
          <button className="book-button">View Details</button>
        </div>
      </div>

      <div className="inner-card-container">
        <CardAuto4 />
      </div>
    </div>
  );
};

const CardAuto4 = () => {
  return (
    <div className="inner-card">
      <span>Lesson Duration: 1.5 Hours</span>
      <span>Location: Clementi</span>
      <span>Remaining Slots: 4</span>
      <span>Pass Rate: 57%</span>
    </div>
  );
};

const CardAuto5 = () => {
  return (
    <div className="card">
      <div className="card-container">
        <div className="details-container">
          <h2>Tan Kim Seong</h2>
          <div className="profile-container">
            <div className="profile-picture-container">
              <img src="profile.jpg" className="profile-picture" alt="Profile" />
            </div>
          </div>
          <div>
            <span>Enrollment Fee: $200</span>
            <span>Lesson Fee: $75</span>
          </div>
          <button className="book-button">View Details</button>
        </div>
      </div>

      <div className="inner-card-container">
        <CardAuto6 />
      </div>
    </div>
  );
};

const CardAuto6 = () => {
  return (
    <div className="inner-card">
      <span>Lesson Duration: 1.5 Hours</span>
      <span>Location: Bright Hill</span>
      <span>Remaining Slots: 6</span>
      <span>Pass Rate: 58%</span>
    </div>
  );
};

export default Dashboard;
