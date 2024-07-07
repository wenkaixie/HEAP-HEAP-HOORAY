"use client"
import { useState } from 'react';
import Navbar from "@/app/components/navbar/navbar";
import './page.css';
import '@/app/components/card/card.css';
import '@/app/components/background/background.css'
import '@/app/components/dashboard/dashboard.css'
import { maxWidth } from '@mui/system';

const ChangePasswordInfo = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmed, setNewPasswordConfirmed] = useState("");

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleNewPasswordConfirmedChange = (event) => {
    setNewPasswordConfirmed(event.target.value);
  };

  return (
    <div className='profile-container'>
      <div className='profile-container-row'>
        <h2>Change Password</h2>
      </div>
      <div className='profile-container-row'>
        <div>
          <h3>Old Password</h3>
          <input 
            type="password"
            placeholder=""
            required
            value={oldPassword}
            onChange={handleOldPasswordChange}
            className='large-input'
          />
        </div>
      </div>
      <div className='profile-container-row'>
        <div>
          <h3>New Password</h3>
          <input 
            type="password"
            placeholder=""
            required
            value={newPassword}
            onChange={handleNewPasswordChange}
            className='large-input'
          />
        </div>
        <div>
          <h3>Confirm New Password</h3>
          <input 
            type="password"
            placeholder=""
            required
            value={newPasswordConfirmed}
            onChange={handleNewPasswordConfirmedChange}
            className='large-input'
          />
        </div>
      </div>
      <br></br>
    </div>
  )
}

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
                <p>Place Holder</p>
              </div>
              <div>
                <h3>Email</h3>
                <p>placeholder@gmail.com</p>
              </div>
              <div>
                <h3>Date Of Birth</h3>
                <p>1999-12-31</p>
              </div>
              <div>
                <h3>Credit Balance</h3>
                <p>999.99</p>
              </div>
            </div>
            <div className='profile-container-row'>
              <button className="book-button btn-open-popup" onClick={togglePopup}>Change Password</button>
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
                  <ChangePasswordInfo />
                  <div className='buttons-container'>
                  <button className='book-button' onClick={togglePopup}>Cancel</button>
                    <button className='book-button' onClick={togglePopup}>Change Password</button>
                  </div>
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