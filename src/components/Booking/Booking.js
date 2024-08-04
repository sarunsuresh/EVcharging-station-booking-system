import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';
import './Booking.css';

// Firebase firestore reference
const db = firebase.firestore();


const Booking = () => {
    const [selectedCity, setSelectedCity] = useState(null);
    const [stations, setStations] = useState([]);
    const [cities, setCities] = useState([]);


  // Firebase firestore reference
  const db = firebase.firestore();
  const navigate = useNavigate();

  // Function to fetch cities
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const snapshot = await db.collection('stations').get();
        const cityList = snapshot.docs.map(doc => doc.id);
        setCities(cityList);
        console.log(setCities);
      } catch (error) {
        console.error('Error fetching cities: ', error);
      }
    };
    fetchCities();
  }, [db]);

  const handleBook = (station) => {
    navigate('/booking-detail', { state: { station } });
    };
    
  // Function to fetch stations for the selected city
  const fetchStations = async (city) => {
    try {
      const snapshot = await db.collection('stations').doc(city).collection('stations').get();
      const stationList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStations(stationList);
    } catch (error) {
      console.error('Error fetching stations: ', error);
    }
  };


    return (
        <div className="booking-container">
            <div className="filter-section">
                <h2>Select a City</h2>
                <div className="city-filters">
                    {cities.map((city, index) => (
                        <label htmlFor={city}>
                        <li key={index}>
                            <input
                            type="radio"
                            id={city}
                            name="city"
                            value={city}
                            checked={selectedCity === city}
                            onChange={() => { setSelectedCity(city); fetchStations(city); }}
                            />
                            </li>
                            {city}</label>
                        
                    ))}
                </div>
            </div>
            <div className="stations-section">
                <h2>Available Charging Stations</h2>
                <div className="stations-list">
                    {selectedCity && (
                        <div>
                            <ul>
                                {stations.map((station, index) => (
                                <div className='station-card'>
                                    <h3>{station.id}</h3>
                                    <p><strong>Location:</strong> {station.Location}</p>
                                    <p><strong>Power Output:</strong> {station['Power Output']}</p>
                                    <p><strong>Charger Type:</strong> {station['Charger Type']}</p>
                                    <p><strong>Distance:</strong> {station.Distance}</p>
                                    <p><strong>Status:</strong> {station.Status}</p>
                                    {station.Status === 'Available' && (
                                        <button onClick={() => handleBook(station)}>Book Now</button>
                                    )}
                                </div>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Booking;
