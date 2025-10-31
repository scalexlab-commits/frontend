import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ 
  productName = "Nike Running Shoe",
  price = "₹2000",
  size = "UK10",
  color = "BLACK/WHITE",
  description = "High-quality running shoe with modern design",
  imageUrl = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
  productId = null
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleViewProduct = () => {
    // Navigate to product detail page with product ID or product name as slug
    const id = productId || productName.toLowerCase().replace(/\s+/g, '-');
    navigate(`/product/${id}`);
  };

  return (
    <div style={{
      width: '300px',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      overflow: 'hidden',
      background: 'white',
      margin: '16px',
      position: 'relative'
    }}>
      {/* Top Section - Product Image */}
      <div style={{
        height: '200px',
        background: 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Product Image */}
        <img 
          src={imageUrl} 
          alt={productName}
          style={{
            width: '80%',
            height: 'auto',
            objectFit: 'contain',
            transform: 'rotate(-15deg)'
          }}
        />
        
        {/* Favorite Button */}
        <button
          onClick={toggleFavorite}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.9)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <span style={{ 
            color: isFavorite ? '#EF4444' : '#6B7280',
            fontSize: '16px'
          }}>
            {isFavorite ? '❤️' : '🤍'}
          </span>
        </button>
      </div>

      {/* Bottom Section - Product Details */}
      <div style={{
        padding: '20px',
        background: 'white'
      }}>
        {/* Product Name */}
        <h3 style={{
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#1F2937',
          margin: '0 0 12px 0',
          lineHeight: '1.2'
        }}>
          {productName}
        </h3>

        {/* Product Tags */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '12px'
        }}>
          <span style={{
            padding: '4px 8px',
            border: '1px solid #D1D5DB',
            borderRadius: '4px',
            fontSize: '12px',
            color: '#374151',
            background: 'white'
          }}>
            {size}
          </span>
          <span style={{
            padding: '4px 8px',
            border: '1px solid #D1D5DB',
            borderRadius: '4px',
            fontSize: '12px',
            color: '#374151',
            background: 'white'
          }}>
            {color}
          </span>
        </div>

        {/* Product Description */}
        <p style={{
          fontSize: '14px',
          color: '#6B7280',
          lineHeight: '1.4',
          margin: '0 0 16px 0'
        }}>
          {description}
        </p>

        {/* Price and Add to Cart */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Price */}
          <div>
            <div style={{
              fontSize: '12px',
              color: '#9CA3AF',
              marginBottom: '4px'
            }}>
              PRICE
            </div>
            <div style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#1F2937'
            }}>
              {price}
            </div>
          </div>

          {/* View Product Button */}
          <button 
            onClick={handleViewProduct}
            style={{
              background: '#8B5CF6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '10px 16px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.background = '#7C3AED'}
            onMouseOut={(e) => e.target.style.background = '#8B5CF6'}
          >
            View Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
