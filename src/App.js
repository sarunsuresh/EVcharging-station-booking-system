import React , { useState, useEffect } from "react";
import NavBar from "./components/NavBar/NavBar";
import Heroo from "./components/Body/Heroo";
import "./App.css";
import Map from "./components/Map/Map";
import TextBoxes from "./components/TextBoxes/TextBoxes";
import About from "./components/About/About";
import Footer from "./components/footer/Footer";
// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2OQFG4_jjnYr8peRo0kYHIKSyCnTNx4c",
  authDomain: "charging-station-f20ad.firebaseapp.com",
  projectId: "charging-station-f20ad",
  storageBucket: "charging-station-f20ad.appspot.com",
  messagingSenderId: "35414851307",
  appId: "1:35414851307:web:dde044220d15546a27c8ae",
  measurementId: "G-9RB634P858"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig); 

function App() {
    const [showMap, setShowMap] = useState(false);

    useEffect(() => {
        // After a delay, show the map component
        const timeout = setTimeout(() => {
          setShowMap(true);
        }, 1000); // Adjust the delay as needed
    
        // Clear the timeout to avoid memory leaks
        return () => clearTimeout(timeout);
      }, []);

  return (
    <div className="app">
      <NavBar />
      <Heroo />
      <TextBoxes />
      {showMap && <Map />}
      <About />
      <Footer />
      <NavBar />
    </div>
  );
}

export default App;