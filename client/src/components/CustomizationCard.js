import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { deleteCustomization } from "../redux/slices/customizationSlice";
import { addToCart } from "../redux/slices/cartSlice";
import "./CustomizationCard.css";

const CustomizationCard = ({ customization, isShowcase = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    // Show confirmation toast with action buttons
    toast.warning("Are you sure you want to delete this customization?", {
      action: {
        label: "Delete",
        onClick: () => {
          dispatch(deleteCustomization(customization.id));
          toast.success("Customization deleted successfully!");
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
    });
  };

  const handleAddToCart = () => {
    if (isShowcase) {
      // Navigate to customization page with pre-selected product
      navigate(`/customization/create?productId=${customization.product.id}`);
    } else {
      dispatch(
        addToCart({
          ...customization.product,
          isCustom: true,
          customizationId: customization.id,
        })
      );
      toast.success("Customization added to cart!");
    }
  };

  return (
    <div className={`customization-card ${isShowcase ? "showcase-card" : ""}`}>
      {isShowcase && <div className="showcase-badge">Featured</div>}
      <div className="customization-image">
        {customization.product?.image ? (
          <img
            src={require(`../assets/product-images/${customization.product.image}`)}
            alt={customization.product.name}
          />
        ) : (
          <span>{customization.product?.category}</span>
        )}
      </div>

      <div className="customization-content">
        <h3>{customization.product?.name}</h3>
        <p className="customization-date">
          Created: {new Date(customization.createdAt).toLocaleDateString()}
        </p>

        <div className="customization-details">
          {customization.text && (
            <div className="detail-item">
              <strong>Text:</strong> {customization.text}
            </div>
          )}
          {customization.image && (
            <div className="detail-item">
              <strong>Image:</strong> ✓ Attached
            </div>
          )}
          {customization.video && (
            <div className="detail-item">
              <strong>Video:</strong> ✓ Attached
            </div>
          )}
          {customization.audio && (
            <div className="detail-item">
              <strong>Audio:</strong> ✓ Attached
            </div>
          )}
          {customization.notes && (
            <div className="detail-item">
              <strong>Notes:</strong> {customization.notes}
            </div>
          )}
        </div>

        <div className="customization-actions">
          <button className="btn-add-cart" onClick={handleAddToCart}>
            {isShowcase ? "Order Similar" : "Add to Cart"}
          </button>
          {!isShowcase && (
            <button className="btn-delete" onClick={handleDelete}>
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomizationCard;
