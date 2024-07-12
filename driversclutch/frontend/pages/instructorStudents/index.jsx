import { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Navbar from "@/app/components/instructorNavbar/navbar";
import './page.css';
import '@/app/components/card/card.css';
import '@/app/components/background/background.css';
import '@/app/components/dashboard/dashboard.css';
import axios from 'axios';

const Dashboard = () => {
  const [studentsData, setStudentsData] = useState(null);
  const [error, setError] = useState(null);

  const fetchStudentsData = async () => {
    try {
      const userDocID = localStorage.getItem('userDocID');
      if (!userDocID) {
        throw new Error('User document ID not found in localStorage');
      }
      const response = await axios.get(`http://localhost:8001/instructors/studentList/?id=${userDocID}`);
      console.log('API Response:', response.data);
      setStudentsData(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchStudentsData();
  }, []);

  if (!studentsData) {
    return null;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const renderStudents = () => {
    return studentsData.studentInfo.map((student, index) => (
      <Card key={index} student={student} lessonDuration={studentsData.lessonDuration}/>
    ));
  };

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <h2>My Students</h2>
        <div className="dashboard-details">
          {studentsData.studentInfo.length > 0 ? renderStudents() : <p>No students found.</p>}
        </div>
      </div>
    </div>
  );
};

const Card = ({ student, lessonDuration }) => {
  const [showUpcoming, setShowUpcoming] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  return (
    <div className="card">
      <h2 style={{ fontSize: '30px' }}>{student.studentName}</h2>
      <br></br>
      <div>
        <h3 onClick={() => setShowUpcoming(!showUpcoming)} style={{ cursor: 'pointer', fontSize: '25px' }}>
          Upcoming Lessons ({student.upcomingLessons.length}) {showUpcoming ? <FaChevronUp /> : <FaChevronDown />}
        </h3>
        {showUpcoming && (
          student.upcomingLessons && student.upcomingLessons.length > 0 ? (
            student.upcomingLessons.map((lesson, index) => (
              <InnerCard key={index} index={student.completedLessons.length} lesson={lesson} lessonDuration={lessonDuration} />
            ))
          ) : (
            <p>No Upcoming Lessons.</p>
          )
        )}
      </div>
      <div>
        <h3 onClick={() => setShowCompleted(!showCompleted)} style={{ cursor: 'pointer', fontSize: '25px' }}>
          Completed Lessons ({student.completedLessons.length}) {showCompleted ? <FaChevronUp /> : <FaChevronDown />}
        </h3>
        {showCompleted && (
          student.completedLessons && student.completedLessons.length > 0 ? (
            student.completedLessons.map((lesson, index) => (
              <InnerCard key={index} index={index} lesson={lesson} lessonDuration={lessonDuration}/>
            ))
          ) : (
            <p>No Completed Lessons.</p>
          )
        )}
      </div>
    </div>
  );
};

const InnerCard = ({ index, lesson, lessonDuration }) => {
  const startDate = new Date(lesson);
  const endDate = new Date(startDate.getTime() + lessonDuration * 60 * 60 * 1000);

  const formattedStartDate = startDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formattedStartTime = startDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const formattedEndTime = endDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className='card'>
      <h2 style={{ fontSize: '25px' }}>Practical Lesson {index + 1}</h2>
      <br></br>
      <h3>{formattedStartDate}</h3>
      <h3>{formattedStartTime} - {formattedEndTime}</h3>
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