import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import {
  updateCustomizationText,
  updateCustomizationImage,
  updateCustomizationVideo,
  updateCustomizationAudio,
  updateCustomizationNotes,
  setCustomizationStep,
  saveCustomization,
  clearCurrentCustomization,
  startCustomization,
} from "../redux/slices/customizationSlice";
import { addToCart } from "../redux/slices/cartSlice";
import "./CreateCustomization.css";

const CreateCustomization = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { currentCustomization } = useSelector((state) => state.customization);
  const products = useSelector((state) => state.products.items);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter products based on search
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination for filtered products
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Auto-select product if productId is in URL params
  useEffect(() => {
    const productId = searchParams.get("productId");
    if (productId && products.length > 0) {
      const product = products.find((p) => p.id === parseInt(productId));
      if (product && !currentCustomization.product) {
        handleProductSelect(product);
      }
    }
  }, [searchParams, products]);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    dispatch(startCustomization(product));
    dispatch(setCustomizationStep(2));
  };

  const handleNext = () => {
    if (currentCustomization.step < 4) {
      dispatch(setCustomizationStep(currentCustomization.step + 1));
    }
  }; 

  const handleBack = () => {
    if (currentCustomization.step > 1) {
      dispatch(setCustomizationStep(currentCustomization.step - 1));
    } else {
      navigate("/customization");
    }
  };

  const handleFileUpload = (type, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        switch (type) {
          case "image":
            dispatch(updateCustomizationImage(reader.result));
            break;
          case "video":
            dispatch(updateCustomizationVideo(reader.result));
            break;
          case "audio":
            dispatch(updateCustomizationAudio(reader.result));
            break;
          default:
            break;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAndAddToCart = () => {
    dispatch(saveCustomization());
    dispatch(
      addToCart({
        ...currentCustomization.product,
        isCustom: true,
        customizationId: Date.now(),
      })
    );
    toast.success("Customization saved and added to cart!");
    navigate("/cart");
  };

  const handleSaveOnly = () => {
    dispatch(saveCustomization());
    toast.success("Customization saved!");
    navigate("/customization");
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderStep = () => {
    switch (currentCustomization.step) {
      case 1:
        return (
          <div className="step-content">
            <h2>Step 1: Select a Jewelry Item</h2>
            <p>
              {currentCustomization.product
                ? "Change your selection or proceed to customize"
                : "Choose the jewelry piece you want to customize"}
            </p>

            <div className="jewelry-search-bar">
              <svg
                className="search-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input
                type="text"
                placeholder="Search jewelry by name or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {filteredProducts.length > 0 ? (
              <>
                <div className="products-selection">
                  {currentProducts.map((product) => (
                    <div
                      key={product.id}
                      className={`product-select-card ${
                        selectedProduct?.id === product.id ||
                        currentCustomization.product?.id === product.id
                          ? "selected"
                          : ""
                      }`}
                      onClick={() => handleProductSelect(product)}
                    >
                      <div className="product-image-placeholder">
                        {product.image ? (
                          <img 
                            src={require(`../assets/product-images/${product.image}`)} 
                            alt={product.name}
                          />
                        ) : (
                          <span>{product.category}</span>
                        )}
                      </div>
                      <h4>{product.name}</h4>
                      <p>₦{product.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="jewelry-pagination">
                    <button
                      className="pagination-btn"
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="15 18 9 12 15 6"></polyline>
                      </svg>
                    </button>

                    <div className="pagination-numbers">
                      {[...Array(totalPages)].map((_, index) => {
                        const pageNum = index + 1;
                        if (
                          pageNum === 1 ||
                          pageNum === totalPages ||
                          (pageNum >= currentPage - 1 &&
                            pageNum <= currentPage + 1)
                        ) {
                          return (
                            <button
                              key={pageNum}
                              className={`pagination-number ${
                                currentPage === pageNum ? "active" : ""
                              }`}
                              onClick={() => handlePageChange(pageNum)}
                            >
                              {pageNum}
                            </button>
                          );
                        } else if (
                          pageNum === currentPage - 2 ||
                          pageNum === currentPage + 2
                        ) {
                          return (
                            <span key={pageNum} className="pagination-ellipsis">
                              ...
                            </span>
                          );
                        }
                        return null;
                      })}
                    </div>

                    <button
                      className="pagination-btn"
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="no-jewelry-found">
                <p>No jewelry found matching "{searchQuery}"</p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="clear-search-btn"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="step-content">
            <h2>Step 2: Add Your Customizations</h2>
            <p>Personalize your jewelry with text, images, video, or audio</p>

            <div className="customization-options">
              <div className="option-group">
                <label>Add Text:</label>
                <textarea
                  value={currentCustomization.text}
                  onChange={(e) =>
                    dispatch(updateCustomizationText(e.target.value))
                  }
                  placeholder="Enter personalized text (e.g., names, dates, messages)..."
                  rows="3"
                />
              </div>

              <div className="option-group">
                <label>Upload Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload("image", e)}
                />
                {currentCustomization.image && (
                  <div className="preview">
                    <img src={currentCustomization.image} alt="Preview" />
                  </div>
                )}
              </div>

              <div className="option-group">
                <label>Upload Video:</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleFileUpload("video", e)}
                />
                {currentCustomization.video && (
                  <p className="file-uploaded">✓ Video uploaded</p>
                )}
              </div>

              <div className="option-group">
                <label>Upload Audio:</label>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => handleFileUpload("audio", e)}
                />
                {currentCustomization.audio && (
                  <p className="file-uploaded">✓ Audio uploaded</p>
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="step-content">
            <h2>Step 3: Additional Notes</h2>
            <p>Provide any additional instructions or specifications</p>

            <div className="customization-options">
              <div className="option-group">
                <label>Special Instructions:</label>
                <textarea
                  value={currentCustomization.notes}
                  onChange={(e) =>
                    dispatch(updateCustomizationNotes(e.target.value))
                  }
                  placeholder="Any special requests, placement preferences, size specifications, etc..."
                  rows="6"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="step-content">
            <h2>Step 4: Review Your Customization</h2>
            <p>Please review your customization before proceeding</p>

            <div className="review-section">
              <div className="review-item">
                <h4>Selected Item:</h4>
                <p>
                  {currentCustomization.product?.name} - $
                  {currentCustomization.product?.price}
                </p>
              </div>

              {currentCustomization.text && (
                <div className="review-item">
                  <h4>Custom Text:</h4>
                  <p>{currentCustomization.text}</p>
                </div>
              )}

              {currentCustomization.image && (
                <div className="review-item">
                  <h4>Custom Image:</h4>
                  <img
                    src={currentCustomization.image}
                    alt="Custom"
                    className="review-image"
                  />
                </div>
              )}

              {currentCustomization.video && (
                <div className="review-item">
                  <h4>Custom Video:</h4>
                  <p>✓ Video file attached</p>
                </div>
              )}

              {currentCustomization.audio && (
                <div className="review-item">
                  <h4>Custom Audio:</h4>
                  <p>✓ Audio file attached</p>
                </div>
              )}

              {currentCustomization.notes && (
                <div className="review-item">
                  <h4>Additional Notes:</h4>
                  <p>{currentCustomization.notes}</p>
                </div>
              )}
            </div>

            <div className="final-actions">
              <button
                className="btn-save-and-cart"
                onClick={handleSaveAndAddToCart}
              >
                Save & Add to Cart
              </button>
              <button className="btn-save-only" onClick={handleSaveOnly}>
                Save for Later
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="create-customization">
      <div className="progress-bar">
        <div className="progress-steps">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`progress-step ${
                currentCustomization.step >= step ? "active" : ""
              } ${currentCustomization.step === step ? "current" : ""}`}
            >
              <div className="step-number">{step}</div>
              <div className="step-label">
                {step === 1 && "Select Item"}
                {step === 2 && "Customize"}
                {step === 3 && "Notes"}
                {step === 4 && "Review"}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="customization-form">
        {renderStep()}

        {currentCustomization.step !== 4 && (
          <div className="navigation-buttons">
            <button className="btn-back" onClick={handleBack}>
              {currentCustomization.step === 1 ? "Cancel" : "Back"}
            </button>
            {(currentCustomization.step > 1 ||
              (currentCustomization.step === 1 &&
                currentCustomization.product)) && (
              <button className="btn-next" onClick={handleNext}>
                {currentCustomization.step === 3 ? "Review" : "Next"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateCustomization;
