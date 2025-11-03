import React, { useState } from 'react';
import '../../assets/css/common.css';

const ToastMessage = ({ 
  message = "Link has expired",
  type = "error", // 'error', 'success', 'warning', 'info'
  onClose,
  showExpand = false,
  expandedContent
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Get icon based on type
  const getIcon = () => {
    switch(type) {
      case 'error':
        return '!';
      case 'success':
        return '✓';
      case 'warning':
        return '⚠';
      case 'info':
        return 'i';
      default:
        return '!';
    }
  };

  const handleToggleExpand = () => {
    if (showExpand && expandedContent) {
      setIsExpanded(!isExpanded);
    }
  };

  // Get background color for close button (needs to match toast background)
  const getBackgroundColor = () => {
    const colors = {
      error: '#1a4d4d',
      success: '#064e3b',
      warning: '#78350f',
      info: '#1e3a8a'
    };
    return colors[type] || colors.error;
  };

  const handleCloseMouseEnter = (e) => {
    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
  };

  const handleCloseMouseLeave = (e) => {
    e.target.style.background = getBackgroundColor();
  };

  return (
    <div className="toast-wrapper">
      <div className={`toast-message toast-${type}`}>
      {/* Left Side - Icon and Message */}
      <div className="toast-content">
        {/* Icon Circle */}
        <div className="toast-icon-circle">
          <span className="toast-icon-text">
            {getIcon()}
          </span>
        </div>

        {/* Message Text */}
        <span className="toast-message-text">
          {message}
        </span>
      </div>

      {/* Right Side - Expand and Close Icons */}
      <div className="toast-actions">
        {/* Expand/Collapse Icon */}
        {showExpand && expandedContent && (
          <button
            onClick={handleToggleExpand}
            className="toast-expand-btn"
          >
            <svg 
              className={`toast-expand-icon ${isExpanded ? 'expanded' : ''}`}
              viewBox="0 0 16 16" 
              fill="none"
            >
              <path 
                d="M4 6L8 10L12 6" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        {/* Close Icon - Same background color */}
        <button
          onClick={onClose}
          className="toast-close-btn"
          style={{ background: getBackgroundColor() }}
          onMouseEnter={handleCloseMouseEnter}
          onMouseLeave={handleCloseMouseLeave}
        >
          <svg 
            className="toast-close-icon"
            viewBox="0 0 14 14" 
            fill="none"
          >
            <path 
              d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" 
            />
          </svg>
        </button>
      </div>

      {/* Expanded Content */}
      {isExpanded && expandedContent && (
        <div className={`toast-expanded-content toast-${type}`}>
          {expandedContent}
        </div>
      )}
      </div>
    </div>
  );
};

export default ToastMessage;

