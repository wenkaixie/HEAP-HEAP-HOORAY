"use client"
import { useState } from 'react';
import Navbar from "@/app/components/instructorNavbar/navbar";
import './page.css';
import '../../components/dashboard/dashboard.css';
import '../../components/card/card.css';
import '../../components/background/background.css';

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
            <div className="profile-picture-container">
                <img src="profile.jpg" class="profile-picture"/>
                <div className="overlay">
                  <div className="edit-icon" onClick={togglePicture}>✎</div>
                </div>
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
          <div>
            <h3>Name</h3>
            <p>Sheng Wei</p>
          </div>
          <div>
            <h3>Students</h3>
            <p>Chaewon Kim FROM LESSERAFIM</p>
            <p>Karina</p>
            <p>Wonyoung</p>
          </div>
          <div>
            <h3>Email</h3>
            <p>test123@gmail.com</p>
          </div>
          <div>
            <h3>Credit Balance</h3>
            <p>264.23</p>
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