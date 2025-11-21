import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { addToCart } from "../redux/slices/cartSlice";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success("Product added to cart!");
  };

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="product-card-image">
        {product.image ? (
          <img
            src={require(`../assets/product-images/${product.image}`)}
            alt={product.name}
          />
        ) : (
          <span>{product.category}</span>
        )}
      </div>

      <div className="product-card-content">
        <h3>{product.name}</h3>
        <p className="product-card-category">{product.category}</p>
        <p className="product-card-description">{product.description}</p>

        <div className="product-card-footer">
          <span className="product-card-price">
            ₦{product.price.toLocaleString()}
          </span>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
