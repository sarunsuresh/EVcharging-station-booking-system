import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './BookingDetail.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const db = firebase.firestore();
const moment = require('moment');

const BookingDetail = () => {
    const location = useLocation();
    const { station } = location.state || {};
    const [timeSlot, setTimeSlot] = useState('');
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            let currentDate = moment().format('YYYY-MM-DD');
            const user = firebase.auth().currentUser;
            await db.collection('booking').doc(user.uid).set({
                name: user.displayName,
            });
            await db.collection('booking').doc(user.uid).collection('mybooking').doc(vehicleNumber).set({
                    Station : station.id,
                    Location : station.Location,
                    Timeslot : timeSlot,
                    Date : currentDate,
                    Vehiclenumber : vehicleNumber,
                    Contactnumber : contactNumber,
              });
              setSuccess(`Booking confirmed for ${station.id} at ${timeSlot}`);
        }catch (error) {
            setError(error.message);
        }
    };

    const generateTimeSlots = () => {
        const slots = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
                slots.push(time);
            }
        }
        return slots;
    };

    if (!station) {
        return <div>No station selected.</div>;
    }

    return (
        <div className="booking-detail-container">
            <div className="booking-detail-card">
                <h2>Booking Details for {station.id}</h2>
                <p>Location: {station.Location}</p>
                <p>Power Output: {station['Power Output']}</p>
                <p>Charger Type: {station['Charger Type']}</p>
                <p>Distance: {station.Distance}</p>
                <form onSubmit={handleSubmit}>
                    <label>
                        Select Time Slot:
                        <select
                            value={timeSlot}
                            onChange={(e) => setTimeSlot(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select a time slot</option>
                            {generateTimeSlots().map(slot => (
                                <option key={slot} value={slot}>{slot}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Vehicle Number:
                        <input
                            type="text"
                            value={vehicleNumber}
                            onChange={(e) => setVehicleNumber(e.target.value)}
                            required
                            className="small-input"
                        />
                    </label>
                    <label>
                        Contact Number:
                        <input
                            type="tel"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            required
                            className="small-input"
                        />
                    </label>
                    <button type="submit">Confirm Booking</button>
                </form>
                <div className="error-text">
                    {error && <p>{error}</p>}
                </div>
                <div className="success-text">
                    {success && <p>{success}</p>}
                </div>
            </div>
        </div>
    );
};

export default BookingDetail;
