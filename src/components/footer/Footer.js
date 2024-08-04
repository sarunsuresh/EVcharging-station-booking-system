// src/components/Footer.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer id="footer" className="footer">
    
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-info">
         
        </div>
        <div className="footer-links">
          
          <ul>
            <li><a href="#">Report an Issue</a></li>
            <li><a href="#">Help</a></li>
            <li><a href="#">FAQ</a></li>
          <li><FontAwesomeIcon icon={faTwitter} /></li>
          <li><FontAwesomeIcon icon={faInstagram} /></li>
          <li><FontAwesomeIcon icon={faFacebook} /></li>
            {/* Add more links as needed */}
          </ul>
        </div>
        <div className="contact-details">
          
        </div>
        <div className="social-icons">
         
        </div>
      </div>
    </footer>
    </footer>
  );
};

export default Footer;
