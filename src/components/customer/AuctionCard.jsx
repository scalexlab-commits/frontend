import React, { useState, useEffect } from 'react';
import '../../assets/css/common.css';

const AuctionCard = ({ 
  title = "Vintage Rolex Submariner Watch",
  description = "Rare 1960s Rolex Submariner in excellent condition with original box and papers. A true collector's piece.",
  currentBid = "$12,500",
  timeLeft = "2h 34m 18s",
  totalBids = "47",
  bidIncrement = "$500",
  imageUrl = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
  isLive = true,
  isBidInitiated
}) => {
  const [timeRemaining, setTimeRemaining] = useState(timeLeft);

  const handleBidUp = () => {
    console.log('Bid Up clicked');
    // Add bid up logic here
  };

  const handleBidOut = () => {
    console.log('Bid Out clicked');
    // Add bid out logic here
  };

  return (
    <div className="auction-card">
      {/* Left Section - Image */}
      <div className="auction-card-image-section">
        <img 
          src={imageUrl} 
          alt={title}
          className="auction-card-image"
        />
        
        {/* Live Auction Badge */}
        {isLive && (
          <div className="auction-card-badge">
            Auctions
          </div>
        )}
      </div>

      {/* Right Section - Details and Actions */}
      <div className="auction-card-details">
        {/* Title and Description */}
        <div>
          <h3 className="auction-card-title">
            {title}
          </h3>
          
          <p className="auction-card-description">
            {description}
          </p>
        </div>

        {/* Auction Metrics */}
        <div className="auction-card-metrics">
          {/* Current Bid */}
          <div className="auction-card-metric-item">
            <div className="auction-card-metric-icon-blue">
              $
            </div>
            <div>
              <div className="auction-card-metric-label">
                Current Bid
              </div>
              <div className="auction-card-metric-value-blue">
                {currentBid}
              </div>
            </div>
          </div>

          {/* Time Left */}
          <div className="auction-card-metric-item">
            <div className="auction-card-metric-icon">
              🕐
            </div>
            <div>
              <div className="auction-card-metric-label">
                Time Left
              </div>
              <div className="auction-card-metric-value">
                {timeRemaining}
              </div>
            </div>
          </div>

          {/* Total Bids */}
          <div className="auction-card-metric-item">
            <div className="auction-card-metric-icon">
              👥
            </div>
            <div>
              <div className="auction-card-metric-label">
                Total Bids
              </div>
              <div className="auction-card-metric-value">
                {totalBids}
              </div>
            </div>
          </div>

          {/* Bid Increment */}
          <div className="auction-card-metric-item">
            <div className="auction-card-metric-icon">
              📈
            </div>
            <div>
              <div className="auction-card-metric-label">
                Bid Increment
              </div>
              <div className="auction-card-metric-value">
                {bidIncrement}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="auction-card-actions">
          {isBidInitiated ? 
          <>
          <button
            onClick={handleBidUp}
            className="auction-card-btn-bid-up"
          >
            <span className="auction-card-btn-icon">↑</span>
            Bid Up
          </button>
          <button
            onClick={handleBidOut}
            className="auction-card-btn-bid-out"
          >
            <span className="auction-card-btn-icon">✕</span>
            Auto Bid Up
          </button>
          </>
          :
          <button
            onClick={() => console.log('Start Bidding clicked')}
            className="auction-card-btn-start"
          >
            <span className="auction-card-btn-icon"></span>
            Start Bidding
          </button> }

        </div>
      </div>
    </div>
  );
};

export default AuctionCard;

