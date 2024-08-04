import React, { useState } from 'react';
import "./signin.css";
import firebase from 'firebase/app';
import 'firebase/auth';
import { Link } from 'react-router-dom';

function Signin() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      window.location.href = '/';
      // Optionally, you can redirect the user to another page after successful sign-in

    } catch (error) {
      setError("Try Again");
    }
  };

  return (
    <div className="signin-container">
      
      <form className="signin-form" onSubmit={handleSignIn}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="signin-button-container">
        <button type="submit" className="signin-button">
          Sign In
        </button>
        </div>
        <div className='error-text'>
          {error && <p>{error}</p>}
        </div>
        <div className='signup-link'>
          <p script="">Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
      </form>
    </div>
  );
}
export default Signin;
