"use client";

import React, { useState, useEffect } from 'react';
import Navbar from "@/app/components/navbar/navbar";
import axios from 'axios';
import './page.css';
import '@/app/components/background/background.css';
import {FirestoreDB, auth} from '../../src/app/firebase/firebase_config';
import { collection, query, where, getDocs, Firestore } from 'firebase/firestore';

const InstructorDetails = ({ togglePopup, instructor, profileData }) => {
  const userDocID = localStorage.getItem('userDocID');

  const fullyEnrol = async (event) => {
    event.preventDefault();

    const instructorQuery = query(collection(FirestoreDB, 'instructors'), where('email', '==', instructor.email));
		const instructorSnapshot = await getDocs(instructorQuery);

		if (!instructorSnapshot.empty) {
			const instructorDocID = instructorSnapshot.docs[0].id;

      const details = {
        studentDocId: userDocID,
        instructorDocId: instructorDocID
      }
      
      try {
        console.log('trying to post', details);
        const response = await axios.post('http://localhost:8001/students/privateInstructors/selected', details, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Full enrolment suceeded');
        console.log('Enrolment Data ', response.data);
      } catch (error) {
        console.log('Error in enrolment ', error);
      }
		}
  };

  const handleEnrolment = async (event) => {
    event.preventDefault();

    const deductValue = {
      studentID: userDocID,
      amount: Number(instructor.enrolmentFee)
    }
    
    try {
      console.log('trying to pay', deductValue);
      const response = await axios.put('http://localhost:8001/students/balance/payment', deductValue, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Payment succeeded!');
      console.log('Balance updated: ', response.data);
      fullyEnrol(event);
      setTimeout(() => {
        togglePopup(); 
      }, 1000);
    } catch (error) {
      console.log('Error in payment: ', error);
    }
  };
  
  const handleEnrolClick = (event) => {
    if (profileData.instructorFullName) {
      alert('Already enrolled to an instructor');
    } else {
      handleEnrolment(event);
    }
  };

  return (
    <div className="instructList-popup-box">
      <div>
        <h2 style={{ fontSize: '30px' }}>Instructor Details</h2>
      </div>
      <br />
      <div className='instructList-container'>
        <div className="instructList-profile-container">
          <div className="instructList-profile-picture-container">
            <img src={instructor.profileImage} className="instructList-profile-picture" />
          </div>
        </div>
        <div className='instructList-container-row'>
          <div>
            <h3>Name</h3>
            <p>{instructor.firstName} {instructor.lastName}</p>
          </div>
          <div>
            <h3>Email</h3>
            <p>{instructor.email}</p>
          </div>
          <div>
            <h3>Locations</h3>
            <p>{instructor.locations.join(', ')}</p>
          </div>
          <div>
            <h3>Pass Rate</h3>
            <p>{instructor.passRate}</p>
          </div>
        </div>
        <div className='instructList-container-row'>
          <div>
            <h3>Lesson Duration</h3>
            <p>{instructor.lessonDuration}</p>
          </div>
          <div>
            <h3>Lesson Fee</h3>
            <p>{instructor.lessonFee}</p>
          </div>
          <div>
            <h3>Enrolment Fee</h3>
            <p>{instructor.enrolmentFee}</p>
          </div>
        </div>
      </div>
      <br />
      <div className='instructList-buttons-container'>
        <button className='instructList-book-button' onClick={handleEnrolClick}>Enrol Now</button>
        <button className='instructList-book-button' onClick={togglePopup}>Close</button>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [instructors, setInstructors] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const [error, setError] = useState(null);

  const fetchProfileData = async () => {
    try {
      const userDocID = localStorage.getItem('userDocID');
      if (!userDocID) {
        throw new Error('User document ID not found in localStorage');
      }
      const response = await axios.get(`http://localhost:8001/students/profile/?id=${userDocID}`);
      console.log('API Response:', response.data);
      setProfileData(response.data.data);
    } catch (error) {
      console.error('Error fetching profileData:', error);
      setError(`Network Error: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await axios.get('http://localhost:8001/students/privateInstructors/manual');
        console.log('API Response:', response.data);
        setInstructors(response.data.data);
      } catch (error) {
        console.error('Error fetching instructors:', error);
        setError(`Network Error: ${error.message}`);
      }
    };

    fetchInstructors();
  }, []);

  const renderContent = () => {
    const cards = instructors.map((instructor, index) => (
      <CardManual key={index} instructor={instructor} profileData={profileData} />
    ));

    return (
      <div className="instructList-dashboard-details">
        {error ? (
          <p>{error}</p>
        ) : (
          instructors.length > 0 ? (
            cards
          ) : (
            <p>Loading...</p>
          )
        )}
      </div>
    );
  };

  return (
    <div className="instructList-dashboard">
      <Navbar />
      <div className="instructList-dashboard-container">
        <h2>Private Instructors</h2>
        <div className="instructList-instructor-class" style ={{ fontSize: '18px'}}>Class 3 Instructors</div>
        {renderContent()}
      </div>
    </div>
  );
};

const CardManual = ({ instructor, profileData }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  return (
    <div className="instructList-card">
      <div className="instructList-card-container">
        <div className="instructList-details-container">
          <h3 className="instructList-instructor-name" style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {instructor.firstName} {instructor.lastName}
          </h3>
          <div className="instructList-profile-container">
            <div className="instructList-profile-picture-container">
              <img src={instructor.profileImage} className="instructList-profile-picture" />
            </div>
          </div>
          <div>
            <span>Enrolment Fee: ${instructor.enrolmentFee}</span>
            <br />
            <span>Lesson Fee: ${instructor.lessonFee}</span>
            <br />
          </div>
          <div id="instructList-popupOverlay" className={`instructList-popup-overlay ${isPopupVisible ? 'show' : ''}`}>
            <InstructorDetails togglePopup={togglePopup} instructor={instructor} profileData={profileData} />
          </div>
        </div>
      </div>
      <div className="instructList-inner-card-container">
        <CardManualDetails instructor={instructor} />
        
        <button onClick={togglePopup} className="instructList-book-button" style={{ textDecoration: 'none', fontSize: '15px'}}>View Details</button>
        
      </div>
    </div>
  );
};



const CardManualDetails = ({ instructor }) => {
  return (
    <div className="instructList-inner-card">
      <span>Lesson Duration: {instructor.lessonDuration} Hours</span>
      <span>Location: {instructor.locations.join(', ')}</span>
      <span>Remaining Slots: {instructor.remainingSlots}</span>
      <span>Pass Rate: {instructor.passRate}</span>
    </div>
  );
};

export default Dashboard;
