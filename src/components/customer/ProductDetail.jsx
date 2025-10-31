import React, { useState } from 'react';

const ProductDetail = () => {
  const [activeTab, setActiveTab] = useState('description');
  const [selectedSize, setSelectedSize] = useState('9');
  const [selectedColor, setSelectedColor] = useState('cream');

  const sizes = ['7', '8', '9', '10', '11', '12'];
  const colors = [
    { name: 'cream', value: '#F5F5DC', label: 'Off-White/Cream' },
    { name: 'blue', value: '#4A90E2', label: 'Blue' },
    { name: 'dark', value: '#2C2C2C', label: 'Dark Grey/Black' }
  ];

  const handleAddToCart = () => {
    console.log('Add to cart:', { size: selectedSize, color: selectedColor });
    // Add to cart logic
  };

  const handleAddToWishlist = () => {
    console.log('Add to wishlist');
    // Add to wishlist logic
  };

  return (
    <div className="product-detail-container">
      {/* Left Section - Product Images */}
      <div className="product-image-section">
        <div className="product-image-wrapper">
          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop"
            alt="REPLICA SNEAKERS"
            className="product-main-image"
          />
          <button className="product-zoom-btn">
            <span className="zoom-icon">+</span>
          </button>
        </div>
      </div>

      {/* Right Section - Product Details */}
      <div className="product-details-section">
        {/* Product Title with NEW Tag */}
        <div className="product-title-row">
          <h1 className="product-title">REPLICA SNEAKERS</h1>
          <span className="product-new-tag">NEW</span>
        </div>

        {/* Collection */}
        <p className="product-collection">SPRING-SUMMER COLLECTION</p>

        {/* Pricing */}
        <div className="product-pricing">
          <span className="product-current-price">£660.00</span>
          <span className="product-original-price">£1,100.00</span>
        </div>

        {/* Information Tabs */}
        <div className="product-tabs">
          <button
            className={`product-tab ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            DESCRIPTION
          </button>
          <button
            className={`product-tab ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => setActiveTab('details')}
          >
            DETAILS
          </button>
          <button
            className={`product-tab ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            REVIEWS
          </button>
          <button
            className={`product-tab ${activeTab === 'size-fit' ? 'active' : ''}`}
            onClick={() => setActiveTab('size-fit')}
          >
            SIZE & FIT
          </button>
        </div>

        {/* Tab Content */}
        <div className="product-tab-content">
          {activeTab === 'description' && (
            <p className="product-description-text">
              Made to resemble men's sports shoes in Austria during the 70s, this smooth leather low top sneaker features tonal suede panels. Textured amber rubber sole.
            </p>
          )}
          {activeTab === 'details' && (
            <p className="product-description-text">Product details will be displayed here.</p>
          )}
          {activeTab === 'reviews' && (
            <p className="product-description-text">Customer reviews will be displayed here.</p>
          )}
          {activeTab === 'size-fit' && (
            <p className="product-description-text">Size and fit information will be displayed here.</p>
          )}
        </div>

        {/* Size Selection */}
        <div className="product-option-group">
          <label className="product-option-label">SIZE</label>
          <div className="product-size-buttons">
            {sizes.map((size) => (
              <button
                key={size}
                className={`product-size-btn ${selectedSize === size ? 'selected' : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selection */}
        <div className="product-option-group">
          <label className="product-option-label">COLOR</label>
          <div className="product-color-swatches">
            {colors.map((color) => (
              <button
                key={color.name}
                className={`product-color-swatch ${selectedColor === color.name ? 'selected' : ''}`}
                style={{ backgroundColor: color.value }}
                onClick={() => setSelectedColor(color.name)}
                title={color.label}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="product-action-buttons">
          <button className="product-btn-cart" onClick={handleAddToCart}>
            ADD TO CART
          </button>
          <button className="product-btn-wishlist" onClick={handleAddToWishlist}>
            ADD TO WISHLIST
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;