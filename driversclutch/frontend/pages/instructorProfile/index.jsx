"use client"
import { useState } from 'react';
import Navbar from "@/app/components/instructorNavbar/navbar";
import './page.css';
import '@/app/components/dashboard/dashboard.css';
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
              <div className="profile-picture-container profile-container-content">
                  <img src="profile.jpg" class="profile-picture"/>
                  <div className="overlay">
                    <div className="edit-icon" onClick={togglePicture}>✎</div>
                  </div>
              </div>
              <div>
                <h3>Name</h3>
                <p>Sheng Wei</p>
              </div>
              <div>
                <h3>Phone Number</h3>
                <p>96998159</p>
              </div>
              <div>
                <h3>Email</h3>
                <p>test123@gmail.com</p>
              </div>
            </div>
            <div className='profile-container-row'>
              <div>
                <h3>Driving Centre</h3>
                <p>CDC</p>
              </div>
              <div>
                <h3>Transmission Type</h3>
                <p>Manual</p>
              </div>
              <div>
                <h3>Car Plate</h3>
                <p>SFC1879F</p>
              </div>
              <div>
                <h3>Work Start</h3>
                <p>09:00</p>
              </div>
            </div>
            <div className='profile-container-row'>
              <div>
                <h3>Work End</h3>
                <p>18:00</p>
              </div>
              <div>
                <h3>Enrolment Fee</h3>
                <p>100.00</p>
              </div>
              <div>
                <h3>Lesson Duration</h3>
                <p>1.5 hours</p>
              </div>
              <div>
                <h3>Lesson Fee</h3>
                <p>80.00</p>
              </div>
            </div>
            <div className='profile-container-row'>
              <div>
                <h3>Locations</h3>
                <p>Sengkang, Hougang</p>
              </div>
              <div>
                <h3>Maximum Students</h3>
                <p>10</p>
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