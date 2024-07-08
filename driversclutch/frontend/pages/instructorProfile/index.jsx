"use client"

import { useState, useEffect } from 'react';
import Navbar from "@/app/components/instructorNavbar/navbar";
import './page.css';
import '@/app/components/card/card.css';
import '@/app/components/background/background.css';
import '@/app/components/dashboard/dashboard.css';
import axios from 'axios';

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
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState(null);

    const togglePicture = () => {
      setIsPictureVisible(!isPictureVisible);
  }

    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    }

    useEffect(() => {
      const fetchProfileData = async () => {
        try {
          const userDocID = localStorage.getItem('userDocID');
          if (!userDocID) {
            throw new Error('User document ID not found in localStorage');
          }
          const response = await axios.get(`http://localhost:8001/instructors/profile/?id=${userDocID}`);
          console.log('API Response:', response.data);
          setProfileData(response.data.data);
        } catch (error) {
          setError(error.message);
        }
      };
  
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
              <div className="profile-picture-container profile-container-content">
                  <img src="profile.jpg" class="profile-picture"/>
                  <div className="overlay">
                    <div className="edit-icon" onClick={togglePicture}>✎</div>
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
                <h3>Phone Number</h3>
                <p>{profileData.phoneNumber}</p>
              </div>
            </div>
            <div className='profile-container-row'>
              <div>
                <h3>Email</h3>
                <p>{profileData.email}</p>
              </div>
              <div>
                <h3>Car Model</h3>
                <p>{profileData.carModel}</p>
              </div>
              <div>
                <h3>Car Plate</h3>
                <p>{profileData.carPlate}</p>
              </div>
              <div>
                <h3>Driving Centre</h3>
                <p>{profileData.drivingCentre}</p>
              </div>
            </div>
            <div className='profile-container-row'>
              <div>
                <h3>Transmission Type</h3>
                <p>{profileData.transmissionType}</p>
              </div>
              <div>
                <h3>Work Start</h3>
                <p>{profileData.workStart}</p>
              </div>
              <div>
                <h3>Work End</h3>
                <p>{profileData.workEnd}</p>
              </div>
              <div>
                <h3>Enrolment Fee</h3>
                <p>{profileData.enrolmentFee}</p>
              </div>
            </div>
            <div className='profile-container-row'>
              <div>
                <h3>Lesson Fee</h3>
                <p>{profileData.lessonFee}</p>
              </div>
              <div>
                <h3>Lesson Duration</h3>
                <p>{profileData.lessonDuration} hr</p>
              </div>
              <div>
                <h3>Locations</h3>
                <p>{profileData.locations}</p>
              </div>
              <div>
                <h3>Maximum Students</h3>
                <p>{profileData.maximumStudents}</p>
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