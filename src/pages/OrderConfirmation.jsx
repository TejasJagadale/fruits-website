import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  return (
    <div className="confirmation-container">
      <div className="confirmation-content">
        <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
        <h2>Order Confirmed!</h2>
        <p>Thank you for your purchase. Your order has been received.</p>
        <p>We'll send you a confirmation email shortly.</p>
        <button className="continue-shopping-btn" onClick={() => navigate("/")}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
