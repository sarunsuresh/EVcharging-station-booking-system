// src/components/Settings/Settings.js

import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [isPrivate, setIsPrivate] = useState(false);
    const [message, setMessage] = useState('');

    const handleSaveSettings = (e) => {
        e.preventDefault();
        setMessage('Settings saved successfully!');
        // Here you can add the logic to save settings to your backend or Firebase
    };

    return (
        <div className="settings-container">
            <h2>Settings</h2>
            <form onSubmit={handleSaveSettings}>
                <div className="form-group">
                    <label htmlFor="notifications">Enable Notifications</label>
                    <input
                        type="checkbox"
                        id="notifications"
                        checked={notificationsEnabled}
                        onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="privacy">Set Profile to Private</label>
                    <input
                        type="checkbox"
                        id="privacy"
                        checked={isPrivate}
                        onChange={() => setIsPrivate(!isPrivate)}
                    />
                </div>
                <button type="submit">Save Settings</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Settings;
