const admin = require('firebase-admin');
const fs = require('fs');

// Initialize the Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://charging-station-f20ad.firebaseio.com'
});

const db = admin.firestore();

// Read the JSON file
const jsonData = require('./stations.json');

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
        await db.collection('stations').doc(city).collection('stations').doc(stationName).set(station);
        console.log(`Station "${stationName}" in "${city}" uploaded successfully.`);
      }
    }
  } catch (error) {
    console.error('Error uploading data: ', error);
  }
}

// Call the function to upload data
uploadData();