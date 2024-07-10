import Navbar from "@/app/components/navbar/navbar";
import './page.css';
import '@/app/components/card/card.css';
import '@/app/components/background/background.css';
import '@/app/components/dashboard/dashboard.css';
import Image from 'next/image';

const Dashboard = () => {

  const callApi = async () => {
    console.log(localStorage.getItem("userToken"));
    console.log(localStorage.getItem("userDocID"));
  }

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <h2>Upcoming Bookings</h2>
        <div className="dashboard-details">
          <div>
            <Card1 />
            <Card2 />
            <Card3 />
          </div>
        </div>
      </div>
      <div className="dashboard-container">
        <div>
          <h2>Make a New Booking</h2>
          <p>Book a Practical Lesson</p>
          <button onClick={callApi} className="book-button">Book Now</button>
        </div>
        <br></br>
        <div>
          <h2>Make a new booking</h2>
          <p>Use this area to describe one of your services.</p>
          <div className="dashboard-details">
            <span>1 hr</span>
            <span>$70</span>
          </div>
          <button onClick={callApi} className="book-button">Book Now</button>
        </div>
      </div>
    </div>
  );
};

const Card1 = () => {
  return (
    <div className="card">
      <div className="card-content">
        <h3>Practical Driving Lesson (4)</h3>
        <div className="card-details">
          <span>8 Oct 2024</span>
          <h3>1900H - 2100H</h3>
        </div>
        <button className="book-button">View Details</button>
      </div>
      <div className="card-content card-image">
        <Image
          src='/assets/practical-driving.png'
          width={100}
          height={100}
        />
      </div>
    </div>
  );
};

const Card2 = () => {
  return (
    <div className="card">
      <div className="card-content">
        <h3>Practical Driving Lesson (4)</h3>
        <div className="card-details">
          <span>8 Oct 2024</span>
          <h3>1900H - 2100H</h3>
        </div>
        <button className="book-button">View Details</button>
      </div>
      <div className="card-content card-image">
        <Image
          src='/assets/practical-driving.png'
          width={100}
          height={100}
        />
      </div>
    </div>
  );
};

const Card3 = () => {
  return (
    <div className="card">
      <div className="card-content">
        <h3>Practical Driving Lesson (4)</h3>
        <div className="card-details">
          <span>8 Oct 2024</span>
          <h3>1900H - 2100H</h3>
        </div>
        <button className="book-button">View Details</button>
      </div>
      <div className="card-content card-image">
        <Image
          src='/assets/practical-driving.png'
          width={100}
          height={100}
        />
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