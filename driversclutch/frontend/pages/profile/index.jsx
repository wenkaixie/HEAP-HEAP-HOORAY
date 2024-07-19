"use client"

import { useState, useEffect } from 'react';
import Navbar from "@/app/components/navbar/navbar";
import './page.css';

import '@/app/components/background/background.css';

import axios from 'axios';

const Dashboard = () => {
  const [isPictureVisible, setIsPictureVisible] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [instructorName, setInstructorName] = useState(null);
  const [error, setError] = useState(null);

  const togglePicture = () => {
    setIsPictureVisible(!isPictureVisible);
  }

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  }

  const fetchProfileData = async () => {
    try {
        const userDocID = localStorage.getItem('userDocID');
        if (!userDocID) {
            throw new Error('User document ID not found in localStorage');
        }

        const response = await axios.get(`http://localhost:8001/students/profile/?id=${userDocID}`);
        console.log('API Response:', response.data);

        const profileData = response.data.data;
        setProfileData(profileData);

        if (profileData.instructorFullName) {
            setInstructorName(profileData.instructorFullName);
            console.log('Instructor Name:', profileData.instructorFullName);
        }
    } catch (error) {
        setError(error.message);
    }
  };


  useEffect(() => {
    fetchProfileData();
  }, []);


  if (!profileData) {
    return null;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <h2>Profile</h2>
        <div className="profile-container">
          <div className='profile-container-row'>
            <div>
              <div className="profile-picture-container">
                <img src="profile.jpg" className="profile-picture" />
                <div className="overlay">
                  <div className="edit-icon" onClick={togglePicture}>✎</div>
                </div>
              </div>
            </div>
            <div>
              <h3>First Name</h3>
              <p>{profileData.firstName}</p>
            </div>
            <div>
              <h3>Last Name</h3>
              <p>{profileData.lastName}</p>
            </div>
            <div>
              <h3>Email</h3>
              <p>{profileData.email}</p>
            </div>
          </div>
          <div className='profile-container-row'>
            <div>
              <h3>Date Of Birth</h3>
              <p>{profileData.birthdate}</p>
            </div>
            <div>
              <h3>Credit Balance</h3>
              <p>{profileData.balance}</p>
            </div>
            <div>
              <h3>Instructor</h3>
              <p>{instructorName}</p>
            </div>
          </div>
          {/* <div className='profile-container-row'>
            <button className="book-button btn-open-popup" onClick={togglePopup}>Change Password</button>
          </div> */}
        </div>
        <div id="pictureOverlay" className={`picture-overlay ${isPictureVisible ? 'show' : ''}`}>
          <div className='picture-box'>
            <h3>Change Photo</h3>
            <div className="profile-picture-container">
              <img src="profile.jpg" className="profile-picture" />
            </div>
            <div className='buttons-container'>
              <button className='book-button'>Upload Picture</button>
              <button className='book-button' onClick={togglePicture}>Save Changes</button>
            </div>
          </div>
        </div>
        {/* <div id="popupOverlay" className={`popup-overlay ${isPopupVisible ? 'show' : ''}`}>
          <div className='popup-box'>
            <ChangePasswordInfo />
            <div className='buttons-container'>
              <button className='book-button' onClick={togglePopup}>Cancel</button>
              <button className='book-button' onClick={togglePopup}>Change Password</button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <main>
      <Navbar />
      <Dashboard />
    </main>
  );
}