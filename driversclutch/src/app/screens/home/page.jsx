import Navbar from "@/app/components/navbar/navbar";
import './page.css';

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
        <p>Use this area to describe one of your services.</p>
        <div className="dashboard-details">
          <span>1 hr</span>
          <span>$70</span>
        </div>
        <button className="book-button">Book Now</button>
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