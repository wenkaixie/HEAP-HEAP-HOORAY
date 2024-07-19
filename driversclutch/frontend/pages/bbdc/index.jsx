import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { storage } from './firebase/firebase_config'; // Adjust the import path as necessary
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import './page.css';

const Navbar = () => (
  <div className="navbar">
    <h1>Theory Test Booking</h1>
  </div>
);

const Sidebar = () => (
  <div className="sidebar">
    <div className="menu">
      <h2>Booking</h2>
      <ul>
        <li>Theory</li>
        <li>Practical</li>
        <li>Test</li>
        <li>Manage Booking</li>
        <li>Training History</li>
        <li>Transactions</li>
        <li>Manage Account</li>
        <li>Tutorial</li>
      </ul>
    </div>
    <div className="profile">
      <p>Welcome Back</p>
      <p>K***** WEI</p>
      <p>Account Balance: $860.92</p>
      <p>Membership Expiry: 12 Mar 2025</p>
      <button>Logout</button>
    </div>
  </div>
);

const Calendar = ({ selectedMonth, setSelectedMonth, selectedDate, setSelectedDate }) => {
  const months = [
    { name: 'JUL\'24', value: 7 },
    { name: 'AUG\'24', value: 8 },
    { name: 'SEP\'24', value: 9 },
    { name: 'OCT\'24', value: 10 },
    { name: 'NOV\'24', value: 11 },
    { name: 'DEC\'24', value: 12 }
  ];

  const daysInMonth = (month, year) => new Date(year, month, 0).getDate();

  const renderCalendarDays = (month, year) => {
    const days = [];
    const firstDay = new Date(year, month - 1, 1).getDay();
    const totalDays = daysInMonth(month, year);

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const fullDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      days.push(
        <div
          key={day}
          className={`day ${selectedDate === fullDate ? 'selected' : ''}`}
          onClick={() => setSelectedDate(fullDate)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const currentMonth = months.find(month => month.name === selectedMonth)?.value || 8;

  return (
    <div className="calendar">
      <h2>CHOICE OF MONTH</h2>
      <h3>Final Theory Evaluation FTE (English)</h3>
      <div className="monthButtons">
        {months.map(month => (
          <button
            key={month.name}
            className={selectedMonth === month.name ? 'selected' : ''}
            onClick={() => setSelectedMonth(month.name)}
          >
            {month.name}
          </button>
        ))}
      </div>
      <div className="calendarContainer">
        <div className="monthSelector">
          <span>&lt;</span> {selectedMonth} <span>&gt;</span>
        </div>
        <div className="days">
          <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
          {renderCalendarDays(currentMonth, 2024)} {/* Displaying selected month */}
        </div>
      </div>
    </div>
  );
};

const Slots = ({ selectedDate, selectedSlot, setSelectedSlot }) => {
  const slots = [
    'SESSION 1 07:30 - 08:15 $5.45',
    'SESSION 2 08:25 - 09:10 $5.45',
    'SESSION 3 09:20 - 10:05 $5.45',
    'SESSION 4 10:15 - 11:00 $5.45',
    'SESSION 5 11:30 - 12:15 $5.45',
    'SESSION 6 12:25 - 13:10 $5.45',
    'SESSION 7 13:20 - 14:05 $5.45',
    'SESSION 8 14:15 - 15:00 $5.45',
    'SESSION 9 15:20 - 16:05 $5.45',
    'SESSION 10 16:15 - 17:00 $5.45',
    'SESSION 11 17:10 - 17:55 $5.45',
    'SESSION 12 18:05 - 18:50 $5.45'
  ];

  return (
    <div className="slots">
      <h2>CHOOSE SLOTS</h2>
      <div className="slotContainer">
        {slots.map(slot => (
          <div
            key={slot}
            className={`slot ${selectedSlot === slot ? 'selected' : ''}`}
            onClick={() => setSelectedSlot(slot)}
          >
            {slot}
          </div>
        ))}
      </div>
    </div>
  );
};

const Summary = ({ selectedDate, selectedSlot }) => (
  <div className="summary">
    <h2>SUMMARY</h2>
    {selectedDate && selectedSlot && (
      <div className="summary-item">
        <p>{selectedDate}</p>
        <p>{selectedSlot}</p>
      </div>
    )}
  </div>
);

const Dashboard = () => {
  const [isPictureVisible, setIsPictureVisible] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [profilePic, setProfilePic] = useState("");
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const togglePicture = () => {
    setIsPictureVisible(!isPictureVisible);
  };

  const fetchProfileData = async () => {
    try {
      const userDocID = localStorage.getItem('userDocID');
      if (!userDocID) {
        throw new Error('User document ID not found in localStorage');
      }
      const response = await axios.get(`http://localhost:8001/instructors/profile/?id=${userDocID}`);
      console.log('API Response:', response.data);
      setProfileData(response.data.data);
      setIsLoading(false);
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
      setProfilePic(response.data.profilePicURL);
      setIsLoading(false);
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
    try {
      await uploadBytes(imageRef, selectedFile).then(() => {
        console.log("Image uploaded successfully");
        alert("Image Uploaded");
      });

      const downloadURL = await getDownloadURL(imageRef);
      console.log("File available at", downloadURL);

      const profilePicURLS = {
        oldImageURL: profilePic,
        newImageURL: downloadURL,
        instructorID: userDocID
      };

      console.log("File available at", profilePicURLS);

      try {
        const response = await axios.post(`http://localhost:8001/instructors/profile/updatePicture`, profilePicURLS, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Picture uploaded:', response.data);
        fetchProfilePic(); // Refresh profile pic data to show the new picture

        // Refresh the page after a short delay to ensure the update is reflected
        setTimeout(() => {
          window.location.reload();
        }, 1000);

      } catch (error) {
        console.log('Error uploading picture:', error);
      }
    } catch (error) {
      console.error("Error uploading image: ", error);
      alert("Error uploading image");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log('Profile Pic:', profilePic);

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <h2>Profile</h2>
        <div className="profile-container">
          <div className='profile-container-row'>
            <div className="profile-picture-container profile-container-content">
              <img src={profilePic ?? ""} className="profile-picture" />
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
            <button className="book-button btn-open-popup" onClick={togglePicture}>Edit Profile</button>
          </div>
        </div>
        <div id="pictureOverlay" className={`picture-overlay ${isPictureVisible ? 'show' : ''}`}>
          <div className='picture-box'>
            <h3>Change Photo</h3>
            <div className="profile-picture-container">
              <img src={profileData.profileImage} className="profile-picture" />
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
      </div>
    </div>
  );
};

const BookingPage = () => {
  const [selectedMonth, setSelectedMonth] = useState('AUG\'24');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');

  const handleConfirmBooking = () => {
    if (selectedDate && selectedSlot) {
      alert(`Booking confirmed for ${selectedDate} during ${selectedSlot}`);
      // Implement the booking logic here
    } else {
      alert('Please select a date and slot before confirming the booking.');
    }
  };

  return (
    <main>
      <Navbar />
      <div className="mainContent">
        <Sidebar />
        <div className="content">
          <Calendar selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          <Slots selectedDate={selectedDate} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
          <Summary selectedDate={selectedDate} selectedSlot={selectedSlot} />
        </div>
      </div>
      <div className="confirm-button-container">
        <button className="confirm-button" onClick={handleConfirmBooking}>Confirm Booking</button>
      </div>
    </main>
  );
};

export default function Home() {
  return (
    <div>
      <BookingPage />
      <Dashboard />
    </div>
  );
}
