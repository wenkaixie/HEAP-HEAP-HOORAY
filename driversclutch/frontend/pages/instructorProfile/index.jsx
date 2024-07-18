"use client"

import { useState, useEffect } from 'react';
import Navbar from "@/app/components/instructorNavbar/navbar";
import './page.css';
import '@/app/components/card/card.css';
import '@/app/components/background/background.css';
import '@/app/components/dashboard/dashboard.css';
import axios from 'axios';
import { storage } from '../../src/app/firebase/firebase_config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

const ProfileInfo = ({ profileData, setIsPopupVisible, fetchProfileData }) => {
  const [carModel, setCarModel] = useState("");
  const [carPlate, setCarPlate] = useState("");
  const [drivingCentre, setDrivingCentre] = useState("");
  const [transmissionType, setTransmissionType] = useState("");
  const [workStart, setWorkStart] = useState("");
  const [workEnd, setWorkEnd] = useState("");
  const [enrolmentFee, setEnrolmentFee] = useState("");
  const [lessonFee, setLessonFee] = useState("");
  const [lessonDuration, setLessonDuration] = useState("");
  const [locations, setLocations] = useState("");
  const [maximumStudents, setMaximumStudents] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [passRate, setPassRate] = useState("");

  useEffect(() => {
    if (profileData) {
      setCarModel(profileData.carModel);
      setCarPlate(profileData.carPlate);
      setDrivingCentre(profileData.drivingCentre);
      setTransmissionType(profileData.transmissionType);
      setWorkStart(profileData.workStart);
      setWorkEnd(profileData.workEnd);
      setEnrolmentFee(profileData.enrolmentFee);
      setLessonFee(profileData.lessonFee);
      setLessonDuration(profileData.lessonDuration);
      setLocations(profileData.locations.join(", "));
      setMaximumStudents(profileData.maximumStudents);
      setPhoneNumber(profileData.phoneNumber);
      setPassRate(profileData.passRate);
    }
  }, [profileData]);

  const handleCarModelChange = (event) => setCarModel(event.target.value);
  const handleCarPlateChange = (event) => setCarPlate(event.target.value);
  const handleDrivingCentreChange = (event) => setDrivingCentre(event.target.value);
  const handleTransmissionTypeChange = (event) => setTransmissionType(event.target.value);
  const handleWorkStartChange = (event) => setWorkStart(event.target.value);
  const handleWorkEndChange = (event) => setWorkEnd(event.target.value);
  const handleEnrolmentFeeChange = (event) => setEnrolmentFee(event.target.value);
  const handleLessonFeeChange = (event) => setLessonFee(event.target.value);
  const handleLessonDurationChange = (event) => setLessonDuration(event.target.value);
  const handleLocationsChange = (event) => setLocations(event.target.value);
  const handleMaximumStudentsChange = (event) => setMaximumStudents(event.target.value);
  const handlePhoneNumberChange = (event) => setPhoneNumber(event.target.value);
  const handlePassRateChange = (event) => setPassRate(event.target.value);

  const userDocID = localStorage.getItem('userDocID');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedProfileData = {
      instructorID: userDocID,
      carModel: carModel,
      carPlate: carPlate,
      drivingCentre: drivingCentre,
      enrolmentFee: Number(enrolmentFee), // Convert to number
      lessonDuration: Number(lessonDuration), // Convert to number
      lessonFee: Number(lessonFee), // Convert to number
      maximumStudents: Number(maximumStudents), // Convert to number
      passRate: passRate,
      phoneNumber: phoneNumber,
      transmissionType: transmissionType,
      workStart: workStart,
      workEnd: workEnd,
      locations: locations.split(",").map(location => location.trim())
    };


    try {
      console.log('Trying to postt', updatedProfileData);
      const response = await axios.put('http://localhost:8001/instructors/profile/update', updatedProfileData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Profile updated:', response.data);
      setIsPopupVisible(false);
      fetchProfileData();
    } catch (error) {
      console.log('Error updating profile:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='profile-container'>
        <div className='profile-container-row'>
          <h2>Edit Profile</h2>
        </div>
        <div className='profile-container-row'>
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
          <div>
            <h3>Phone Number</h3>
            <input 
              type="text"
              required
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              className='large-input'
            />
          </div>
        </div>
        <div className='profile-container-row'>
          <div>
            <h3>Car Model</h3>
            <input 
              type="text"
              required
              value={carModel}
              onChange={handleCarModelChange}
              className='large-input'
            />
          </div>
          <div>
            <h3>Car Plate</h3>
            <input 
              type="text"
              required
              value={carPlate}
              onChange={handleCarPlateChange}
              className='large-input'
            />
          </div>
          <div>
            <h3>Driving Centre</h3>
            <input 
              type="text"
              required
              value={drivingCentre}
              onChange={handleDrivingCentreChange}
              className='large-input'
            />
          </div>
          <div>
            <h3>Transmission Type</h3>
            <input 
              type="text"
              required
              value={transmissionType}
              onChange={handleTransmissionTypeChange}
              className='large-input'
            />
          </div>
        </div>
        <div className='profile-container-row'>
          <div>
              <h3>Work Start</h3>
              <input 
                type="text"
                required
                value={workStart}
                onChange={handleWorkStartChange}
                className='large-input'
              />
          </div>
          <div>
              <h3>Work End</h3>
              <input 
                type="text"
                required
                value={workEnd}
                onChange={handleWorkEndChange}
                className='large-input'
              />
          </div>
          <div>
              <h3>Enrolment Fee</h3>
              <input 
                type="text"
                required
                value={enrolmentFee}
                onChange={handleEnrolmentFeeChange}
                className='large-input'
              />
          </div>
          <div>
              <h3>Lesson Fee</h3>
              <input 
                type="text"
                required
                value={lessonFee}
                onChange={handleLessonFeeChange}
                className='large-input'
              />
          </div>
        </div>
        <div className='profile-container-row'>
          <div>
              <h3>Lesson Duration</h3>
              <input 
                type="text"
                required
                value={lessonDuration}
                onChange={handleLessonDurationChange}
                className='large-input'
              />
          </div>
          <div>
              <h3>Locations</h3>
              <input 
                type="text"
                required
                value={locations}
                onChange={handleLocationsChange}
                className='large-input'
              />
          </div>
          <div>
              <h3>Maximum Students</h3>
              <input 
                type="text"
                required
                value={maximumStudents}
                onChange={handleMaximumStudentsChange}
                className='large-input'
              />
          </div>
          <div>
              <h3>Pass Rate</h3>
              <input 
                type="text"
                required
                value={passRate}
                onChange={handlePassRateChange}
                className='large-input'
              />
          </div>
        </div>
        <div className='profile-container-row'>
          <button type="submit" className='book-button'>Save Changes</button>
        </div>
      </div>
    </form>
  );
};

const Dashboard = () => {
    const [isPictureVisible, setIsPictureVisible] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const [profilePic, setProfilePic] = useState(null);
    const [error, setError] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

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
        const response = await axios.get(`http://localhost:8001/instructors/profile/?id=${userDocID}`);
        console.log('API Response:', response.data);
        setProfileData(response.data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchProfilePic = async () => {
      try {
        const userDocID = localStorage.getItem('userDocID');
        if (!userDocID) {
          throw new Error('User document ID not found in localStorage');
        }
        const response = await axios.get(`http://localhost:8001/instructors/profile/getPicture/?id=${userDocID}`);
        console.log('API Response:', response.data);
        setProfilePic(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    useEffect(() => {
      fetchProfileData();
      fetchProfilePic();
    }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadPicture = async () => {
    if (!selectedFile) {
        alert("Please select a file first");
        return;
    }

    const imageRef = ref(storage, `images/${selectedFile.name + v4()}`);
    const userDocID = localStorage.getItem('userDocID');
    console.log(profilePic.profilePicURL);
    try{
      await uploadBytes(imageRef, selectedFile).then(() => {
        console.log("image uploaded successfully");
        alert("Image Uploaded");
      });

      // Get the download URL
      const downloadURL = await getDownloadURL(imageRef);
      console.log("File available at", downloadURL);
      // alert(`File available at ${downloadURL}`);

      const profilePicURLS = {
        oldImageURL: profilePic.profilePicURL,
        newImageURL: downloadURL,
        instructorID: userDocID
      }

      try {
          const response = await axios.post(`http://localhost:8001/instructors/profile/updatePicture`, profilePicURLS, {
              headers: {
                'Content-Type': 'application/json',
              },
          });
          console.log('Picture uploaded:', response.data);
          fetchProfileData(); // Refresh profile data to show the new picture
          setTimeout(() => {
            togglePicture(); 
          }, 1000);
        } catch (error) {
            console.log('Error uploading picture:', error);
        }
    } catch (error) {
      console.error("Error uploading image: ", error);
      alert("Error uploading image");
    }
}
 
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
                  <img src={profilePic.profilePicURL} class="profile-picture"/>
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
                <h3>Email</h3>
                <p>{profileData.email}</p>
              </div>
              <div>
                <h3>Phone Number</h3>
                <p>{profileData.phoneNumber}</p>
              </div>
            </div>
            <div className='profile-container-row'>
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
              <div>
                <h3>Transmission Type</h3>
                <p>{profileData.transmissionType}</p>
              </div>
            </div>
            <div className='profile-container-row'>
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
              <div>
                <h3>Lesson Fee</h3>
                <p>{profileData.lessonFee}</p>
              </div>
            </div>
            <div className='profile-container-row'>
              <div>
                <h3>Lesson Duration</h3>
                <p>{profileData.lessonDuration} Hr</p>
              </div>
              <div>
                <h3>Locations</h3>
                <p>{profileData.locations.join(", ")}</p>
              </div>
              <div>
                <h3>Maximum Students</h3>
                <p>{profileData.maximumStudents}</p>
              </div>
              <div>
                <h3>Pass Rate</h3>
                <p>{profileData.passRate}</p>
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
                <img src={profileData.profileImage} class="profile-picture"/>
              </div>
              <div>
                <input className='custom-file-input' type="file" onChange={handleFileChange} />
              </div>
              <div className='buttons-container'>
                <button className='book-button' onClick={handleUploadPicture}>Upload Picture</button>
                <button className='book-button' onClick={togglePicture}>Cancel</button>
              </div>
            </div>
          </div>
          <div id="popupOverlay" className={`popup-overlay ${isPopupVisible ? 'show' : ''}`}>
              <div className='popup-box'>
                  <ProfileInfo profileData={profileData} setIsPopupVisible={setIsPopupVisible} fetchProfileData={fetchProfileData} />
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