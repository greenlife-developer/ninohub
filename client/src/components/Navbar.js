import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Navbar.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalQuantity } = useSelector((state) => state.cart);
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <img
            src={require("../assets/logo.svg").default}
            alt="Shop with Nino"
            className="logo-img"
          />
          <span>Shop with Nino</span>
        </Link>

        <ul className={`navbar-menu ${isMobileMenuOpen ? "active" : ""}`}>
          <li>
            <Link to="/" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" onClick={closeMobileMenu}>
              Products
            </Link>
          </li>
          <li>
            <Link to="/customization" onClick={closeMobileMenu}>
              Customization
            </Link>
          </li>
          {isAuthenticated ? (
            <li className="user-info">{currentUser?.name || "User"}</li>
          ) : (
            <li>
              <Link to="/login" onClick={closeMobileMenu}>
                Login
              </Link>
            </li>
          )}
        </ul>

        <div className="navbar-actions">
          <Link to="/cart" className="cart-link" onClick={closeMobileMenu}>
            <img
              src={require("../assets/cart-icon.svg").default}
              alt="Cart"
              className="cart-icon"
            />
            <span>Cart</span>
            {totalQuantity > 0 && (
              <span className="cart-badge">{totalQuantity}</span>
            )}
          </Link>

          <button
            className={`hamburger ${isMobileMenuOpen ? "active" : ""}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>
      )}
    </nav> 
  );
};

export default Navbar;
