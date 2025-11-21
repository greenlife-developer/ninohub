import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";
import CustomizationCard from "../components/CustomizationCard";
import "./Customization.css";

const Customization = () => {
  const location = useLocation();
  const { customizations, businessCustomizations } = useSelector(
    (state) => state.customization
  );
  const { isAuthenticated } = useSelector((state) => state.user);
  const isCreatePage = location.pathname.includes("/create");

  // If user is logged in, show user customizations first, then business ones
  // If not logged in, show only business customizations
  const displayCustomizations = isAuthenticated
    ? [...customizations, ...businessCustomizations]
    : businessCustomizations;

  if (isCreatePage) {
    return <Outlet />;
  }

  return (
    <div className="customization-page">
      <div className="customization-header">
        <h1>Shop With Nino | Jewelry Customization</h1>
        <p>Create unique, personalized jewelry pieces</p>
      </div> 

      <div className="customization-intro">
        <div className="intro-content">
          <h2>Make It Yours</h2>
          <p>
            Transform our beautiful jewelry pieces into something truly unique.
            Add personal text, images, videos, or audio to create a
            one-of-a-kind piece that tells your story.
          </p>
          <Link to="/customization/create" className="btn-start-customization">
            Start Customizing
          </Link>
        </div>
      </div>

      {isAuthenticated && customizations.length > 0 && (
        <div className="previous-customizations">
          <h2>Your Customizations</h2>
          <div className="customizations-grid">
            {customizations.map((custom) => (
              <CustomizationCard key={custom.id} customization={custom} />
            ))}
          </div>
        </div>
      )}

      <div className="previous-customizations">
        <h2>
          {isAuthenticated && customizations.length > 0
            ? "Featured Customizations by Shop with Nino"
            : "Customization Gallery"}
        </h2>
        <p className="gallery-description">
          {isAuthenticated
            ? "Get inspired by our showcase designs"
            : "See what our customers have created"}
        </p>
        {businessCustomizations.length > 0 ? (
          <div className="customizations-grid">
            {businessCustomizations.map((custom) => (
              <CustomizationCard
                key={custom.id}
                customization={custom}
                isShowcase={true}
              />
            ))}
          </div>
        ) : (
          <div className="no-customizations">
            <p>No customizations to display yet.</p>
            <p>Be the first to create a custom piece!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Customization;
