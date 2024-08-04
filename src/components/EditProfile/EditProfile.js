// EditProfile.js
import React, { useState, useEffect } from 'react';
import './EditProfile.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const db = firebase.firestore();

const EditProfile = () => {
    const [user, setUser] = useState(null);
    const [userDetails, setUserDetails] = useState({
        displayName: '',
        email: '',
        phoneNumber: '',
        password: '',
        newPassword: '',
      });
      const [error, setError] = useState('');
      const [success, setSuccess] = useState('');

      useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(currentUser => {
          if (currentUser) {
            setUser(currentUser);
            setUserDetails({
              displayName: currentUser.displayName || '',
              email: currentUser.email || '',
              phoneNumber: currentUser.phoneNumber || '',
              password: '',
              newPassword: '',
            });
            fetchUserDetails(currentUser.uid);
          } else {
            setUser(null);
            setUserDetails({
              displayName: '',
              email: '',
              phoneNumber: '',
              password: '',
              newPassword: '',
            });
          }
        });
    
        return () => unsubscribe();
      }, []);

      const fetchUserDetails = async (uid) => {
        try {
          const userDoc = await db.collection('users').doc(uid).get();
          if (userDoc.exists) {
            const data = userDoc.data();
            setUserDetails(prevDetails => ({
              ...prevDetails,
              ...data
            }));
          }
        } catch (error) {
          console.error("Error fetching user details: ", error);
        }
      };

      const reauthenticate = (currentPassword) => {
        const user = firebase.auth().currentUser;
        const cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prevDetails => ({
          ...prevDetails,
          [name]: value
        }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return;
    
        try {

          await reauthenticate(userDetails.password);
          // Update Firebase Authentication
          if (userDetails.displayName !== user.displayName) {
            await user.updateProfile({ displayName: userDetails.displayName });
          }
          if (userDetails.newPassword) {
            await user.updatePassword(userDetails.newPassword);
          }
          if (userDetails.phoneNumber !== user.phoneNumber) {
            const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
              size: 'invisible'
            });
          }
          // Update Firestore
          await db.collection('users').doc(user.uid).set({
            displayName: userDetails.displayName,
            phoneNumber: userDetails.phoneNumber
          }, { merge: true });
          setError('');
          setSuccess('Profile updated successfully!');
          firebase.auth().signOut().then(() => {window.location.href = '/signin'});
        } catch (error) {
          setError(error.message);
          setSuccess('');
        }
      };


    return (
        <div>
            <div className="profile">
                <form className='profile-form' onSubmit={handleSubmit}>
                    <h1>Edit Profile</h1>
                    <p>Name</p>
                    <input type="text" name="displayName" placeholder='Your Name' value={userDetails.displayName} onChange={handleChange}/>
                    <p>phone Number</p>
                    <input type="tel" name="phoneNumber" placeholder='Your Phone Number' value={userDetails.phoneNumber} onChange={handleChange}/>
                    <div id="recaptcha-container"></div>
                    <p>Current password</p>
                    <input type="password" name="password" placeholder='Current Password' value={userDetails.password} onChange={handleChange}/>
                    <p>New password</p>
                    <input type="password" name="newPassword" placeholder='New Password' value={userDetails.NewPassword} onChange={handleChange}/>
                    <button type='submit' className='submit-button'>Submit</button>
                    <div className="error-text">
                        {error && <p>{error}</p>}
                    </div>
                    <div className="success-text">
                        {success && <p>{success}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
