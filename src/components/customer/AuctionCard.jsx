import React, { useState, useEffect } from 'react';

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
    <div style={{
      display: 'flex',
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      overflow: 'hidden',
      margin: '16px',
      // maxWidth: '800px',
      width: '100%'
    }}>
      {/* Left Section - Image */}
      <div style={{
        width: '300px',
        height: '300px',
        position: 'relative',
        background: '#f8f9fa'
      }}>
        <img 
          src={imageUrl} 
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        
        {/* Live Auction Badge */}
        {isLive && (
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: '#10B981',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            Auctions
          </div>
        )}
      </div>

      {/* Right Section - Details and Actions */}
      <div style={{
        flex: 1,
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        {/* Title and Description */}
        <div>
          <h3 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1F2937',
            margin: '0 0 12px 0',
            lineHeight: '1.2'
          }}>
            {title}
          </h3>
          
          <p style={{
            fontSize: '14px',
            color: '#6B7280',
            lineHeight: '1.5',
            margin: '0 0 20px 0'
          }}>
            {description}
          </p>
        </div>

        {/* Auction Metrics */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginBottom: '24px'
        }}>
          {/* Current Bid */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '20px',
              height: '20px',
              background: '#3B82F6',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              $
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '2px' }}>
                Current Bid
              </div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#3B82F6' }}>
                {currentBid}
              </div>
            </div>
          </div>

          {/* Time Left */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '20px',
              height: '20px',
              background: '#6B7280',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '12px'
            }}>
              🕐
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '2px' }}>
                Time Left
              </div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1F2937' }}>
                {timeRemaining}
              </div>
            </div>
          </div>

          {/* Total Bids */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '20px',
              height: '20px',
              background: '#6B7280',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '12px'
            }}>
              👥
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '2px' }}>
                Total Bids
              </div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1F2937' }}>
                {totalBids}
              </div>
            </div>
          </div>

          {/* Bid Increment */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '20px',
              height: '20px',
              background: '#6B7280',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '12px'
            }}>
              📈
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '2px' }}>
                Bid Increment
              </div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1F2937' }}>
                {bidIncrement}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '12px'
        }}>
          {isBidInitiated ? 
          <>
          <button
            onClick={handleBidUp}
            style={{
              width: '120px',
              background: '#3B82F6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 16px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'background 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.background = '#2563EB'}
            onMouseOut={(e) => e.target.style.background = '#3B82F6'}
          >
            <span style={{ fontSize: '16px' }}>↑</span>
            Bid Up
          </button>
          <button
            onClick={handleBidOut}
            style={{
              width: '150px',
              background: '#EF4444',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 16px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'background 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.background = '#DC2626'}
            onMouseOut={(e) => e.target.style.background = '#EF4444'}
          >
            <span style={{ fontSize: '16px' }}>✕</span>
            Auto Bid Up
          </button>
          </>
          :
          <button
            onClick={() => console.log('Start Bidding clicked')}
            style={{
              // flex: 1,
              background: '#0dbf10ff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 16px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'background 0.2s ease'
            }}
            // onMouseOver={(e) => e.target.style.background = '#22f337ff'}
            // onMouseOut={(e) => e.target.style.background = '#EF4444'}
          >
            <span style={{ fontSize: '16px' }}></span>
            Start Bidding
          </button> }

        </div>
      </div>
    </div>
  );
};

export default AuctionCard;

