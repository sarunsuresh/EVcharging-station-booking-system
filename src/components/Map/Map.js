import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import "./Map.css";
function Map() {
    const mapStyles = {
        height: "50vh",
        width: "100%"
    };

    const defaultCenter = {
        lat: 41.3851, lng: 2.1734
    };

    return (
        <div className="map">
        <LoadScript
            googleMapsApiKey="AIzaSyB7BDJeV4OqrYcPRnUf5EZDJ6VN5aPfnk4"
        >
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                center={defaultCenter}
            />
        </LoadScript>
        </div>
    );
}

export default Map;