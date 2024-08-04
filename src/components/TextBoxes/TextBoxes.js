// TextBoxes.js

import React from 'react';
import './TextBoxes.css'; // Import your component's CSS file

function TextBoxes() {
  return (
    <div>
      
      <div className="box-container">
        <div className="box">
          <h3>Check price  before and  pay through </h3>
          <p>Checkout affordable prices transparently beforehand and pay with various modes within the app, We don't have any hidden changes..</p>
        </div>
        <div className="box">
          <h3>Book a charging slot at your convenient time</h3>
          <p>Have urgent matters to attend to but need to charge your vehicle? Pre-book a slot at the most convenient time and get on with your work</p>
        </div>
        <div className="box">
          <h3>From scooter to a car,find your type</h3>
          <p>Find, plug and forget.Our system is compatiable with all kinds of electric vehicles.So go out stress-free.</p>
        </div>
      </div>
    </div>
  );
}

export default TextBoxes;
