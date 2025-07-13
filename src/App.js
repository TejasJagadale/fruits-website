import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Scrollto from "./components/Scrollto";
import Home from "./pages/Home";
import About from "./pages/About";
import CancellationandRefund from "./pages/CancellationandRefund";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Myaccount from "./pages/Myaccount";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ShippingandDelivery from "./pages/ShippingandDelivery";
import TermsandConditions from "./pages/TermsandConditions";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Shop from "./pages/Shop";

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollToTopButton />
        <Scrollto />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/cancellation-and-refund"
            element={<CancellationandRefund />}
          />
          <Route path="/gallery" element={<Gallery />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/my-account" element={<Myaccount />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            path="/shipping-and-delivery"
            element={<ShippingandDelivery />}
          />
          <Route
            path="/terms-and-conditions"
            element={<TermsandConditions />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
