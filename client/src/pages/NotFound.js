import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="error-code">404</div>
        <h1>Page Not Found</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <p className="suggestion">
          It might have been moved or deleted, or you may have mistyped the URL.
        </p>
        <div className="not-found-actions">
          <button
            className="btn-products"
            onClick={() => navigate("/products")}
          >
            Browse Products
          </button>
          <button className="btn-home" onClick={() => navigate("/")}>
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
