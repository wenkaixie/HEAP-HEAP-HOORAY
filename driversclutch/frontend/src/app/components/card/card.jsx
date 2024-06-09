import React from 'react';
import './card.css';

// sample card
const Card = () => {
  return (
    <div className="card">
      <h2>Corporate Life</h2>
      <p>Use this area to describe one of your services.</p>
      <div className="card-details">
        <span>1 hr</span>
        <span>$70</span>
      </div>
      <button className="book-button">Book Now</button>
    </div>
  );
};

export default Card;
