import React from "react";
import "../styles/Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faMapMarkerAlt, faClock } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-section">
          <div className="footer-heading">
            <FontAwesomeIcon icon={faPhone} className="footer-icon" />
            <h3>Contact Us</h3>
          </div>
          <div className="footer-content">
            <p>9876543210</p>
            <p>xyz@gmail.com</p>
          </div>
        </div>

        <div className="footer-section">
          <div className="footer-heading">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="footer-icon" />
            <h3>Address</h3>
          </div>
          <div className="footer-content">
            <p>XXX no, YYY street</p>
            <p>ZZZ city</p>
            <p>XXX state, 12345</p>
          </div>
        </div>

        <div className="footer-section">
          <div className="footer-heading">
            <FontAwesomeIcon icon={faClock} className="footer-icon" />
            <h3>Opening Hours</h3>
          </div>
          <div className="footer-content">
            <p>6AM TO 6PM</p>
            <p>Monday - Sunday</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-copyright">
          ©2025 Fresh-fruits, all rights reserved.
        </div>
        
        <div className="footer-logo">
          <img src="/images/logo.png" alt="Fresh Fruits Logo" />
        </div>
        
        <div className="footer-social">
          <a href="#" aria-label="Facebook">
            <FontAwesomeIcon icon={faFacebookF} className="social-icon" />
          </a>
          <a href="#" aria-label="Instagram">
            <FontAwesomeIcon icon={faInstagram} className="social-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;