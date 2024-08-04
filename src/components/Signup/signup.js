import "./signup.css";
import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const db = firebase.firestore();

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      // Update the user's display name with the provided name
      await user.updateProfile({
        displayName: name,

      });
      await db.collection('users').doc(user.uid).set({
        name: name,
        email: email,
        phoneNumber: phoneNumber
      });
      alert("Account Created!");
      // Optionally, you can redirect the user to another page after successful sign-up

    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="signup-container">
      
      <form className="signup-form" onSubmit={handleSignUp}>
        <div className="form-group">
          <label htmlFor="Name">Full Name</label>
          <input type="text" id="Name" name="Name" value={name} onChange={(e) => setName(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="phone">New Password</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" id="phone" name="phone" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Signup;
