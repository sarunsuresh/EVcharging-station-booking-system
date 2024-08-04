import React from "react";
import  { useState } from "react";
import "./NavBar.css";
import { faUser, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAuth from './useAuth';
import firebase from 'firebase/app';
import 'firebase/auth';

function NavBar() {
  const user = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSignOut = () => {
    firebase.auth().signOut().then(() => {
      window.location.href = '/';  // Redirect to home page after sign-out
    }).catch((error) => {
      console.error(error);
    });
  };

  const scrollToFooter = () => {
    const footer = document.getElementById("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="navbar">
      <nav>
        <ul>
          <li><button onClick={() => window.location.href = '/'}>Home</button></li>
          <li><button onClick={scrollToFooter}>Contact</button></li>
          <li><button onClick={() => window.location.href = '/services'}>Services</button></li>
          
          {user ? (
            <>
              <li className="profile" onClick={toggleDropdown}>
                <FontAwesomeIcon icon={faUser} />
                <span className="user-name">{user.displayName}</span>
                <FontAwesomeIcon icon={faAngleDown} className="dropdown-icon" />
                {showDropdown && (
                  <div className="dropdown-content">
                    <button onClick={() => window.location.href = '/dashboard'}>My Bookings</button>
                    <button onClick={() => window.location.href = '/edit-profile'}>Edit Profile</button>
                    <button onClick={handleSignOut}>Sign Out</button>
                  </div>
                )}
              </li>
            </>
          ) : (
            <>
              <li className="signup"><button onClick={() => window.location.href = '/signup'}>Sign Up</button></li>
              <li className="signin"><button onClick={() => window.location.href = '/signin'}>Sign In</button></li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
