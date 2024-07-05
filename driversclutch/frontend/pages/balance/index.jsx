"use client"
import { useState } from 'react';
import Navbar from "@/app/components/navbar/navbar";
import './page.css';
import '@/app/components/card/card.css';
import '@/app/components/background/background.css'
import '@/app/components/dashboard/dashboard.css'

const Dashboard = () => {
    return (
      <div className="dashboard">
        <div className="dashboard-container">
          <h2>Calendar</h2>
          <p>Use this area to describe one of your services.</p>
          <div className="dashboard-details">
            <span>1 hr</span>
            <span>$70</span>
          </div>
          <button className="book-button">Book Now</button>
        </div>

        <div className="dashboard-container">
          <h2>Calendar</h2>
          <p>Use this area to describe another one of your services.</p>
          <div className="dashboard-details">
            <span>1 hr</span>
            <span>$70</span>
          </div>
          <button className="book-button">Book Now</button>
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