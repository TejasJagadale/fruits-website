import React, { useEffect, useState } from "react";
import "../styles/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMap,
  faPhone,
  faBars,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let scrollListenerActive = false;

    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    const handleResize = () => {
      const isMobile = window.innerWidth <= 768; // Match your mobile breakpoint

      if (isMobile && scrollListenerActive) {
        window.removeEventListener("scroll", handleScroll);
        scrollListenerActive = false;
        setIsSticky(false); // Reset sticky state when switching to mobile
      } else if (!isMobile && !scrollListenerActive) {
        window.addEventListener("scroll", handleScroll);
        scrollListenerActive = true;
        handleScroll(); // Check initial position
      }
    };

    // Initial check
    handleResize();

    // Add resize listener
    window.addEventListener("resize", handleResize);

    return () => {
      // Clean up both listeners
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="heady">
      {/* Top Header Bar */}
      <header className={`header-main ${isSticky ? "sticky" : ""}`}>
        <div className="header-container">
          <Link to="/">
            <img
              className="logo-main"
              src="/images/logo.png"
              alt="Fresh Fruits Logo"
            />
          </Link>

          <div className="contact-info">
            <div className="contact-item">
              <div className="icon-wrapper">
                <FontAwesomeIcon icon={faPhone} className="contact-icon" />
              </div>
              <div className="contact-text">
                <div className="contact-label">Call</div>
                <div className="contact-value">9876543210</div>
              </div>
            </div>

            <div className="contact-item">
              <div className="icon-wrapper">
                <FontAwesomeIcon icon={faMap} className="contact-icon" />
              </div>
              <div className="contact-text">
                <div className="contact-label">Timings</div>
                <div className="contact-value">6AM - 6PM</div>
              </div>
            </div>

            <div className="contact-item">
              <div className="icon-wrapper">
                <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
              </div>
              <div className="contact-text">
                <div className="contact-label">Location</div>
                <div className="contact-value">Salem</div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
          </button>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav
        className={`navbar-main ${isMobileMenuOpen ? "mobile-open" : ""} ${
          isSticky ? "sticky" : ""
        }`}
      >
        <div className="nav-container">
          <ul className="nav-list">
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/") ? "active" : ""}`}
                to="/"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/about") ? "active" : ""}`}
                to="/about"
                onClick={closeMobileMenu}
              >
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/gallery") ? "active" : ""}`}
                to="/gallery"
                onClick={closeMobileMenu}
              >
                Gallery
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/contact") ? "active" : ""}`}
                to="/contact"
                onClick={closeMobileMenu}
              >
                Contact Us
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  isActive("/my-account") ? "active" : ""
                }`}
                to="/my-account"
                onClick={closeMobileMenu}
              >
                My Account
              </Link>
            </li>
            <li className="nav-item dropdown">
              <span
                className={`nav-link more-link ${
                  isActive("/privacy-policy") ||
                  isActive("/terms-and-conditions") ||
                  isActive("/cancellation-and-refund") ||
                  isActive("/shipping-and-delivery")
                    ? "active"
                    : ""
                }`}
              >
                More <span className="dropdown-arrow">▼</span>
              </span>
              <ul className="dropdown-menu">
                <li>
                  <Link
                    className={`dropdown-link ${
                      isActive("/privacy-policy") ? "active" : ""
                    }`}
                    to="/privacy-policy"
                    onClick={closeMobileMenu}
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    className={`dropdown-link ${
                      isActive("/terms-and-conditions") ? "active" : ""
                    }`}
                    to="/terms-and-conditions"
                    onClick={closeMobileMenu}
                  >
                    Terms and Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    className={`dropdown-link ${
                      isActive("/cancellation-and-refund") ? "active" : ""
                    }`}
                    to="/cancellation-and-refund"
                    onClick={closeMobileMenu}
                  >
                    Cancellation and Refund
                  </Link>
                </li>
                <li>
                  <Link
                    className={`dropdown-link ${
                      isActive("/shipping-and-delivery") ? "active" : ""
                    }`}
                    to="/shipping-and-delivery"
                    onClick={closeMobileMenu}
                  >
                    Shipping and Delivery
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
export default Header;
