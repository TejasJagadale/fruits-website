import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/About.css";

const About = () => {
  const navigate = useNavigate();
  return (
    <div>
      <section className="abt-section">
        <div className="pageheadmain">
          <p className="pagehead">About us</p>
        </div>
        <div className="abt-container">
          <div className="about-image">
            <img src="/images/logo.png" alt="Fresh Fruits Logo" />
            <img src="/images/logo.png" alt="Fresh Fruits Logo" />
          </div>

          <div className="abt-content">
            <div className="section-abtheader">
              <span className="section-subtitle">ABOUT US</span>
              <h2 className="righthead">How We Made Healthy</h2>
              <div className="divider"></div>
            </div>

            <div className="features-abtlist">
              <div className="feature-item">
                <div className="feature-text">
                  <h3>Healthy Zone</h3>
                  <p>Welcome to Nalam Fruitz, where health meets flavor!</p>
                </div>
              </div>

              <div className="feature-item">
                <p className="feature-itemp">
                  We are dedicated to bringing you the freshest, high-quality
                  fruits that nourish your body and delight your taste buds. At
                  Nalam Fruitz, we believe that nature’s bounty is the best
                  source of nutrition, and we make it our mission to deliver it
                  straight to your table.
                </p>
              </div>

              <div className="feature-item">
                <p className="feature-itemp">
                  Our fruits are handpicked from trusted farms, ensuring they
                  are packed with freshness, flavor, and nutrients. Whether
                  you’re seeking exotic options, seasonal favorites, or
                  wholesome daily staples, we’ve got something for everyone.
                </p>
              </div>

              <div className="feature-item">
                <p className="feature-itemp">
                  We’re more than just a fruit store—we’re a brand committed to
                  promoting wellness (“Nalam” means “Wellness”). From our
                  rigorous quality checks to eco-friendly practices, every
                  choice we make reflects our dedication to your health and the
                  planet.
                </p>
              </div>
            </div>

            <button className="order-button" onClick={() => navigate("/shop")}>
              Check Our Menu
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
