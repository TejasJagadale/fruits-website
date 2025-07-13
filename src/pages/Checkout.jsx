import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "",
    streetAddress: "",
    city: "",
    state: "",
    pinCode: "",
    phone: "",
    email: ""
  });

  // Load cart items from localStorage when component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
    calculateTotal(storedCart);
  }, []);

  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => {
      // Handle both string and number prices
      const price =
        typeof item.price === "string"
          ? Number(item.price.replace(/[^0-9.-]+/g, ""))
          : Number(item.price);
      return acc + price * item.quantity;
    }, 0);
    setTotal(sum);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "country",
      "streetAddress",
      "city",
      "state",
      "pinCode",
      "phone",
      "email"
    ];

    const missingFields = requiredFields.filter(
      (field) => !formData[field].trim()
    );

    if (missingFields.length > 0) {
      toast.error(
        `Please fill in all required fields: ${missingFields.join(", ")}`,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        }
      );
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address", {
        position: "top-center"
      });
      return false;
    }

    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Please enter a valid phone number", {
        position: "top-center"
      });
      return false;
    }

    return true;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    console.log("Order placed:", { formData, cartItems, total });
    localStorage.removeItem("cart");

    toast.success("Order placed successfully!", {
      position: "top-center"
    });

    setTimeout(() => {
      navigate("/order-confirmation");
    }, 2000);
  };

  // Function to safely get price value
  const getPriceValue = (price) => {
    if (typeof price === "string") {
      return Number(price.replace(/[^0-9.-]+/g, ""));
    }
    return Number(price);
  };

  // Function to get item title (handles both title and name)
  const getItemTitle = (item) => {
    return item.title || item.name || "Untitled Item";
  };

  return (
    <div className="checkout-container">
      <ToastContainer />

      <h2>
        <FontAwesomeIcon icon={faShoppingCart} /> Checkout
      </h2>

      <div className="checkout-grid">
        <div className="billing-details">
          <h3>Billing Details</h3>
          <form onSubmit={handlePlaceOrder}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={!formData.firstName ? "required-field" : ""}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={!formData.firstName ? "required-field" : ""}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="country">Country / Region *</label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className={!formData.firstName ? "required-field" : ""}
                required
              >
                <option value="">Select a country...</option>
                <option value="India">India</option>
                <option value="USA">United States</option>
                <option value="UK">United Kingdom</option>
                {/* Add more countries as needed */}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="streetAddress">Street Address *</label>
              <input
                type="text"
                id="streetAddress"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange}
                className={!formData.firstName ? "required-field" : ""}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">Town / City *</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={!formData.firstName ? "required-field" : ""}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="state">State *</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className={!formData.firstName ? "required-field" : ""}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="pinCode">PIN Code *</label>
                <input
                  type="text"
                  id="pinCode"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleInputChange}
                  className={!formData.firstName ? "required-field" : ""}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={!formData.firstName ? "required-field" : ""}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={!formData.firstName ? "required-field" : ""}
                  required
                />
              </div>
            </div>
          </form>
        </div>

        <div className="order-summary">
          <h3>Your Order</h3>
          <div className="order-items">
            {cartItems.map((item) => (
              <div key={item.id} className="order-item">
                <div className="item-name">
                  {getItemTitle(item)} <span>× {item.quantity}</span>
                </div>
                <div className="item-price">
                  ₹{(getPriceValue(item.price) * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="order-totals">
            <div className="total-row">
              <span>Subtotal</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="total-row grand-total">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="place-order-btn"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
