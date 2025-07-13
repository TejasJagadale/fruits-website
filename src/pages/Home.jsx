import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/Home.css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faLemon,
  faTruck,
  faShoppingCart,
  faStar
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const plans = [
    {
      id: 1,
      title: "1 Week Plan",
      days: "6 Days",
      price: "₹300",
      image: "cart1.jpg"
    },
    {
      id: 2,
      title: "2 Week Plan",
      days: "12 Days",
      price: "₹600",
      image: "cart2.jpg"
    },
    {
      id: 3,
      title: "1 Month Plan",
      days: "26 Days",
      price: "₹1300",
      image: "cart3.jpg"
    }
  ];

  const handleAddToCart = (plan) => {
    // Get existing cart from localStorage or initialize empty array
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if item already exists in cart
    const existingItemIndex = existingCart.findIndex(
      (item) => item.id === plan.id
    );

    if (existingItemIndex >= 0) {
      // If item exists, update quantity
      existingCart[existingItemIndex].quantity += 1;
    } else {
      // If item doesn't exist, add it with quantity 1
      existingCart.push({ ...plan, quantity: 1 });
    }

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(existingCart));

    // Navigate to cart page
    navigate("/cart");
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Fresh Fruits</h1>
          <p className="hero-subtitle">
            Experience the Freshness, Indulge in Flavor
          </p>
          <button className="cta-button" onClick={() => navigate("/shop")}>Shop Now</button>
        </div>

        <div className="swiper-container">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 3000 }}
            loop={true}
          >
            {[1, 2, 3, 4, 5].map((slide) => (
              <SwiperSlide key={slide}>
                <img
                  src={`/images/${slide}.jpg`}
                  alt={`Slide ${slide}`}
                  className="slide-image"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Subscription Plans */}
      <section className="plans-section">
        <div className="plans-container">
          {plans.map((plan) => (
            <div className="plan-card" key={plan.id}>
              <div className="card-badge">Popular</div>
              <img
                src={`/images/${plan.image}`}
                alt={plan.title}
                className="plan-image"
              />
              <div className="plan-details">
                <h3>
                  {plan.title} - ({plan.days})
                </h3>
                <div className="price-section">
                  <span className="price">{plan.price}</span>
                  {plan.id === 2 && <span className="discount">Save 10%</span>}
                </div>
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon
                      icon={faStar}
                      key={i}
                      className="star-icon"
                    />
                  ))}
                  <span>(24)</span>
                </div>
                <button
                  className="add-to-cart"
                  onClick={() => handleAddToCart(plan)}
                >
                  <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-image">
            <img src="/images/logo.png" alt="Fresh Fruits Logo" />
          </div>

          <div className="about-content">
            <div className="section-header">
              <span className="section-subtitle">ABOUT US</span>
              <h2>How we make fruit salad</h2>
              <div className="divider"></div>
            </div>

            <div className="features-list">
              <div className="feature-item">
                <div className="feature-icon">
                  <FontAwesomeIcon icon={faHome} />
                </div>
                <div className="feature-text">
                  <h3>Healthy Zone</h3>
                  <p>Achieve your healthy lifestyle you always dreamed of 😊</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <FontAwesomeIcon icon={faLemon} />
                </div>
                <div className="feature-text">
                  <h3>Best Fruits Combo</h3>
                  <p>Made with locally sourced and seasonal fruits</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <FontAwesomeIcon icon={faTruck} />
                </div>
                <div className="feature-text">
                  <h3>Fast Delivery</h3>
                  <p>
                    Enjoy Salads on the go, at your work or at home - delivered
                    at your door step
                  </p>
                </div>
              </div>
            </div>

            <button className="order-button" onClick={() => navigate("/shop")}>
              ORDER NOW
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
