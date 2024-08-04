import React, { useState } from 'react';
import './Dashboard.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import './../NavBar/useAuth.js'

const db = firebase.firestore();

const Dashboard = () => {
    const [bookings, setBookings] = useState([]);
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    
    
    // Sample data, you can fetch this from a database or API
    const fetchbooking = async (e) => {
        await delay(500);
        try{
            const user = firebase.auth().currentUser;
            const snapshot = await db.collection('booking').doc(user.uid).collection('mybooking').get();
            const bookingList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setBookings(bookingList);
        }catch(error){
        }


    };
    fetchbooking();

    return (
        <div className="my-bookings-container">
            <h2>My Bookings</h2>
            <ul>
                {bookings.map((booking) => (
                    <li>
                        <h3>{booking.Vehiclenumber}</h3>
                        <p>Date: {booking.Date}</p>
                        <p>Time: {booking.Timeslot}</p>
                        <p>Location: {booking.Location}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
