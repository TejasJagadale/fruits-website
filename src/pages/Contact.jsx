import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faHome,
  faLemon,
  faLocation,
  faLocationDot,
  faMailBulk,
  faPhone,
  faPlayCircle,
  faTimes,
  faTruck
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import "../styles/Contact.css";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    mobile: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[0-9]{10,15}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number is invalid";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Here you would typically send the data to a server
      console.log("Form submitted:", formData);
      setIsSubmitted(true);
      // Reset form after submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        mobile: "",
        message: ""
      });
    }
  };

  if (isSubmitted) {
    return (
      <div className="success-message">
        <h2>Thank you for your feedback!</h2>
        <p>We appreciate you taking the time to share your thoughts with us.</p>
        <button onClick={() => setIsSubmitted(false)}>
          Submit another feedback
        </button>
      </div>
    );
  }
  return (
    <div>
      <div className="pageheadmain">
        <p className="pagehead">Contact Us</p>
      </div>
      <div className="contact-section">
        <div className="about-cntsection">
          <div className="about-container">
            <div className="about-content">
              <div className="section-header">
                <span className="section-subtitle">ABOUT US</span>
                <h2>How we make fruit salad</h2>
                <div className="divider"></div>
              </div>

              <div className="features-list">
                <div className="feature-item">
                  <div className="feature-icon">
                    <FontAwesomeIcon icon={faPhone} />
                  </div>
                  <div className="feature-text">
                    <h3>Call anytime</h3>
                    <p>89036 88080 , 89036 78080</p>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="feature-icon">
                    <FontAwesomeIcon icon={faMailBulk} />
                  </div>
                  <div className="feature-text">
                    <h3>Mail</h3>
                    <p>contact@nalamfruitz.store</p>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="feature-icon">
                    <FontAwesomeIcon icon={faClock} />
                  </div>
                  <div className="feature-text">
                    <h3>Timings</h3>
                    <p>Everyday : From 6.00 AM To 6.00 PM</p>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="feature-icon">
                    <FontAwesomeIcon icon={faLocationDot} />
                  </div>
                  <div className="feature-text">
                    <h3>Locations</h3>
                    <p>
                      No 2 ,Varadharaja puram, west street , near dmart,
                      Singanallur 641015
                    </p>
                  </div>
                </div>
              </div>
              <div className="cnticon">
                <div className="feature-icon">
                  <FontAwesomeIcon icon={faFacebook} />
                </div>
                <div className="feature-icon">
                  <FontAwesomeIcon icon={faInstagram} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="feedback-form-container">
          <h1>Feedback Form</h1>
          <form onSubmit={handleSubmit} className="feedback-form">
            <div className="form-group">
              <label htmlFor="name">Your Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "error" : ""}
              />
              {errors.name && (
                <span className="error-message">{errors.name}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Your Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject:</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={errors.subject ? "error" : ""}
              />
              {errors.subject && (
                <span className="error-message">{errors.subject}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="mobile">Mobile:</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className={errors.mobile ? "error" : ""}
              />
              {errors.mobile && (
                <span className="error-message">{errors.mobile}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className={errors.message ? "error" : ""}
              ></textarea>
              {errors.message && (
                <span className="error-message">{errors.message}</span>
              )}
            </div>

            <button type="submit" className="submit-btn">
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
