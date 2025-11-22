import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { clearCart } from "../redux/slices/cartSlice";
import "./Checkout.css";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalAmount } = useSelector((state) => state.cart);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Shipping Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    // Payment Info
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handlePlaceOrder = () => {
    // Simulate order processing
    toast.success("Order placed successfully! Thank you for your purchase.", {
      duration: 5000,
    });
    dispatch(clearCart());
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const shipping = 15.0;
  const tax = totalAmount * 0.08; // 8% tax
  const finalTotal = totalAmount + shipping + tax;

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-progress">
        <div className={`progress-item ${step >= 1 ? "active" : ""}`}>
          <div className="progress-circle">1</div>
          <span>Shipping</span>
        </div>
        <div className={`progress-item ${step >= 2 ? "active" : ""}`}>
          <div className="progress-circle">2</div>
          <span>Payment</span>
        </div>
        <div className={`progress-item ${step >= 3 ? "active" : ""}`}>
          <div className="progress-circle">3</div>
          <span>Review</span>
        </div>
      </div>

      <div className="checkout-content">
        <div className="checkout-form">
          {step === 1 && (
            <div className="form-section">
              <h2>Shipping Information</h2>
              <div className="form-grid">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name *"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name *"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="full-width"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number *"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="full-width"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Street Address *"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="full-width"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City *"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State/Province *"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="zipCode"
                  placeholder="ZIP/Postal Code *"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Country *"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-section">
              <h2>Payment Information</h2>
              <div className="form-grid">
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number *"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  required
                  className="full-width"
                  maxLength="16"
                />
                <input
                  type="text"
                  name="cardName"
                  placeholder="Name on Card *"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  required
                  className="full-width"
                />
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY *"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  required
                  maxLength="5"
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV *"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  required
                  maxLength="4"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-section review-section">
              <h2>Review Your Order</h2>

              <div className="review-group">
                <h3>Shipping Address</h3>
                <p>
                  {formData.firstName} {formData.lastName}
                </p>
                <p>{formData.address}</p>
                <p>
                  {formData.city}, {formData.state} {formData.zipCode}
                </p>
                <p>{formData.country}</p>
                <p>{formData.email}</p>
                <p>{formData.phone}</p>
              </div>

              <div className="review-group">
                <h3>Payment Method</h3>
                <p>Card ending in {formData.cardNumber.slice(-4)}</p>
                <p>{formData.cardName}</p>
              </div>

              <div className="review-group">
                <h3>Order Items</h3>
                {items.map((item) => (
                  <div key={item.id} className="review-item">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>₦{item.totalPrice.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="form-actions">
            {step > 1 && (
              <button className="btn-back" onClick={handleBack}>
                Back
              </button>
            )}
            {step < 3 ? (
              <button className="btn-next" onClick={handleNext}>
                Continue
              </button>
            ) : (
              <button className="btn-place-order" onClick={handlePlaceOrder}>
                Place Order
              </button>
            )}
          </div>
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>

          <div className="summary-items">
            {items.map((item) => (
              <div key={item.id} className="summary-item">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>₦{item.totalPrice.toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="summary-totals">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₦{totalAmount.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>₦{shipping.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Tax (8%)</span>
              <span>₦{tax.toLocaleString()}</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₦{finalTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
