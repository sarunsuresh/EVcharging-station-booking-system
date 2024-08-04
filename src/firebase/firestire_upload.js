// Require Firebase modules
const firebase = require("firebase/app");
require("firebase/firestore");
const fs = require("fs");

// Firebase configuration
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
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Read the JSON file
const jsonData = require("./stations.json");

// Function to upload JSON data to Firestore
async function uploadData() {
  try {
    // Loop through the top-level keys in the JSON data (e.g., "stations")
    for (let city in jsonData.stations) {
      // Loop through the stations within each city
      for (let stationName in jsonData.stations[city]) {
        // Get the station details
        const station = jsonData.stations[city][stationName];

        // Add the station to Firestore
        await db.collection("cities").doc(city).collection("stations").doc(stationName).set(station);
        console.log(`Station "${stationName}" in "${city}" uploaded successfully.`);
      }
    }
  } catch (error) {
    console.error("Error uploading data: ", error);
  }
}

// Call the function to upload data
uploadData();