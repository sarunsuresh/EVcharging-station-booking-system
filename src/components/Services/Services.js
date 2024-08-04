import React from 'react';
import './Services.css';

const Services = () => {
  return (
    <div className="services-container">
      <h1 className="services-title">Our Services</h1>
      
      <div className="service-item">
        <h2>Easy Finding and Booking of Charging Stations</h2>
        <p>Our platform offers a seamless experience for locating and booking EV charging stations. With just a few clicks, you can find the nearest charging stations, check their availability, and make a booking in advance to ensure you never run out of charge.</p>
      </div>
      
      <div className="service-item">
        <h2>Advantages of Electric Vehicles</h2>
        <p>Electric vehicles offer numerous benefits including lower running costs, reduced emissions, and a quieter driving experience. They are also equipped with the latest technology, making them a smarter choice for the modern driver.</p>
      </div>
      
      <div className="service-item">
        <h2>Environmental Imperatives</h2>
        <p>Transitioning to electric vehicles is crucial for reducing our carbon footprint and combating climate change. Our platform supports this mission by making EV ownership more convenient and accessible, thereby encouraging more people to make the switch.</p>
      </div>
    </div>
  );
};

export default Services;
