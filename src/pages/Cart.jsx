import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import "../styles/Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  // Load cart items from localStorage when component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log(storedCart);

    setCartItems(storedCart);
    calculateTotal(storedCart);
  }, []);

  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => {
      // Handle both price formats (₹ symbol or plain number)
      const priceString = item.price || item.price;
      const price = Number(priceString.toString().replace(/[^0-9.-]+/g, ""));
      return acc + price * item.quantity;
    }, 0);
    setTotal(sum);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  // Function to get the correct title/name
  const getItemTitle = (item) => {
    return item.title || item.name || "Untitled Item";
  };

  // Function to get the days or category
  const getItemDetails = (item) => {
    if (item.days) return `Duration: ${item.days}`;
    if (item.category) return `Category: ${item.category}`;
    return "";
  };

  return (
    <>
      <div className="pageheadmain">
        <p className="pagehead">Your Cart</p>
      </div>
      <div className="cart-container">
        <button className="contshopbtn" onClick={() => navigate("/")}>
          Continue Shopping
        </button>

        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img
                    src={`/fruits/${item.image}`}
                    alt={item.name || item.title || "Product"} // Proper alt text for accessibility
                    onError={(e) => {
                      const img = e.target;
                      // First try /images/ path if /fruits/ failed
                      if (img.src.endsWith(`/fruits/${item.image}`)) {
                        img.src = `/images/${item.image}`;
                      }
                      // If /images/ also fails, use placeholder
                      else {
                        img.src = "/fruits/placeholder.jpg";
                        img.onerror = null; // Prevent infinite loop
                      }
                    }}
                  />
                </div>
                <div className="item-details">
                  <h3>{getItemTitle(item)}</h3>
                  {getItemDetails(item) && <p>{getItemDetails(item)}</p>}
                  <p>Price: {item.price}</p>

                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </div>

                <button
                  className="remove-item"
                  onClick={() => removeItem(item.id)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            ))}

            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div className="total">
                <span>Total:</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <button
                className="checkout-button"
                onClick={() => navigate("/checkout")}
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
