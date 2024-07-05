"use client"
import { useState } from 'react';
import Navbar from "@/app/components/navbar/navbar";
import './page.css';
import '@/app/components/card/card.css';
import '@/app/components/background/background.css'
import '@/app/components/dashboard/dashboard.css'

const Dashboard = () => {
    const [isPictureVisible, setIsPictureVisible] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const togglePicture = () => {
      setIsPictureVisible(!isPictureVisible);
  }

    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    }

    return (
      <div className="dashboard">
        <div className="dashboard-container">
          <h2>Profile</h2>
          <div className="profile-container">
            <div className='profile-container-row'>
              <div className="profile-picture-container">
                  <img src="profile.jpg" class="profile-picture"/>
                  <div className="overlay">
                    <div className="edit-icon" onClick={togglePicture}>✎</div>
                  </div>
              </div>
              <div>
                <h3>Name</h3>
                <p>Tay Zhi En</p>
              </div>
              <div>
                <h3>Email</h3>
                <p>zhizhi@gmail.com</p>
              </div>
              <div>
                <h3>Date Of Birth</h3>
                <p>1998-04-24</p>
              </div>
              <div>
                <h3>Credit Balance</h3>
                <p>284.00</p>
              </div>
            </div>
            <div className='profile-container-row'>
              <button className="book-button btn-open-popup" onClick={togglePopup}>Edit Profile</button>
            </div>
          </div>
          <div id="pictureOverlay" className={`picture-overlay ${isPictureVisible ? 'show' : ''}`}>
            <div className='picture-box'>
              <h3>Change Photo</h3>
              <div className="profile-picture-container">
                <img src="profile.jpg" class="profile-picture"/>
              </div>
              <div className='buttons-container'>
                <button className='book-button'>Upload Picture</button>
                <button className='book-button' onClick={togglePicture}>Save Changes</button>
              </div>
            </div>
          </div>
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