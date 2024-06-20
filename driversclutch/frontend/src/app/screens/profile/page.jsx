"use client"
import { useState } from 'react';
import Navbar from "@/app/components/navbar/navbar";
import './page.css';
import '../../components/dashboard/dashboard.css';
import '../../components/card/card.css';
import '../../components/background/background.css';

const Dashboard = () => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    }

    return (
      <div className="dashboard">
        <div className="dashboard-container">
          <h2>Profile</h2>
          <div className="profile-container">
            <div className="profile-picture-container">
                <img src="profile.jpg" class="profile-picture"/>
                <div class="overlay">
                    <div class="edit-icon">✎</div>
                </div>
            </div>
          </div>
        <button className="book-button btn-open-popup" onClick={togglePopup}>Edit Profile</button>
        <div id="popupOverlay" className={`popup-overlay ${isPopupVisible ? 'show' : ''}`}>
            <div className='popup-box'>
                <button className='book-button' onClick={togglePopup}>Save Changes</button>
            </div>
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