import Navbar from "@/app/components/instructorNavbar/navbar";
import './page.css';
import '@/app/components/card/card.css';
import '@/app/components/background/background.css'
import '@/app/components/dashboard/dashboard.css'

const Dashboard = () => {
    return (
      <div className="dashboard">
        <div className="dashboard-container">
          <h2>Calendar</h2>
          <p>Use this area to describe one of your services.</p>
          <div className="dashboard-details">
            <span>1 hr</span>
            <span>$70</span>
          </div>
          <button className="book-button">Book Now</button>
        </div>
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
      </div>
    );
  };
  
  const Card1 = () => {
    return (
      <div className="card">
        <h2>Practical Driving Lesson (4)</h2>
        <div className="card-details">
          <span>8 Oct 2024</span>
          <h3>1900H - 2100H</h3>
        </div>
        <button className="book-button">View Details</button>
      </div>
    );
  };
  
  const Card2 = () => {
    return (
      <div className="card">
        <h2>Practical Driving Lesson (5)</h2>
        <div className="card-details">
          <span>10 Oct 2024</span>
          <h3>1900H - 2100H</h3>
        </div>
        <button className="book-button">View Details</button>
      </div>
    );
  };
  
  const Card3 = () => {
    return (
      <div className="card">
        <h2>Practical Driving Lesson (6)</h2>
        <div className="card-details">
          <span>12 Oct 2024</span>
          <h3>1900H - 2100H</h3>
        </div>
        <button className="book-button">View Details</button>
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