import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { get, post } from '../common/apiProvider';
import ToastMessage from '../common/ToastMessage';
import '../../assets/css/common.css';

const SellerRegistraion = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    mobile: '',
    whatsapp_number: '',
    seller_username: '',
    address_city: '',
    address_state: '',
    address_country: '',
    listing_type: 'Individual'
  });
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('error');
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  // Submit Registration Form - First verify username, then submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowToast(false);

    try {
      // Step 1: Check username availability first
      if (!formData.seller_username.trim()) {
        setToastMessage('Please enter a seller username');
        setToastType('error');
        setShowToast(true);
        setLoading(false);
        return;
      }

      const usernameCheckResponse = await get(`/api/check-username?username=${encodeURIComponent(formData.seller_username)}`);
      
      if (!usernameCheckResponse.success || usernameCheckResponse.data?.isAvailable !== true) {
        setToastMessage('Username is not available. Please choose a different username.');
        setToastType('error');
        setShowToast(true);
        setLoading(false);
        return;
      }

      // Step 2: Username is available, proceed with registration
      const response = await post('/api/seller', formData);

      // Handle API response - check various response formats
      if (response.success === true || (response.success === undefined && response)) {
        // Success response - extract message from various formats
        const successMsg = response.data?.message || response.message || 'Registration successful!';
        setToastMessage(successMsg);
        setToastType('success');
        setShowToast(true);
        
        // Redirect after successful registration
        setTimeout(() => {
          navigate('/market');
        }, 2000);
      } else {
        // Response indicates failure - extract error message from API response
        const errorMsg = response.data?.message || response.message || response.error?.message || response.data?.error || 'Registration failed. Please try again.';
        setToastMessage(typeof errorMsg === 'string' ? errorMsg : JSON.stringify(errorMsg));
        setToastType('error');
        setShowToast(true);
      }
    } catch (err) {
      console.error('Registration error:', err);
      let errorMessage = 'Unable to register. Please try again.';
      
      // Enhanced error extraction - prioritize API response error structure
      // The enhanced handleResponse attaches error.data with full API response
      if (err.data) {
        // API response error data is attached by handleResponse
        if (err.data.data?.message) {
          errorMessage = err.data.data.message;
        } else if (err.data.message) {
          errorMessage = err.data.message;
        } else if (err.data.data?.error) {
          errorMessage = err.data.data.error;
        } else if (err.data.error) {
          errorMessage = typeof err.data.error === 'string' 
            ? err.data.error 
            : err.data.error?.message || JSON.stringify(err.data.error);
        } else if (err.data.errors && Array.isArray(err.data.errors)) {
          // Handle validation errors array
          errorMessage = err.data.errors.map(e => 
            typeof e === 'string' ? e : e.message || JSON.stringify(e)
          ).join(', ');
        } else if (typeof err.data === 'string') {
          errorMessage = err.data;
        } else {
          // Fallback: try to extract any meaningful message
          errorMessage = err.data.message || JSON.stringify(err.data);
        }
      } else if (err.message) {
        // Use the error message from the Error object
        errorMessage = err.message;
      } else if (typeof err === 'string') {
        errorMessage = err;
      }
      
      setToastMessage(errorMessage);
      setToastType('error');
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (showToast) setShowToast(false);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  return (
    <div className="seller-registration-container">
      <div className="seller-registration-wrapper">
        <h1 className="seller-registration-title">Seller Registration</h1>

        {/* Toast Message */}
        {showToast && (
          <div className="seller-registration-toast">
            <ToastMessage
              message={toastMessage}
              type={toastType}
              onClose={handleCloseToast}
            />
          </div>
        )}

        {/* Single Registration Form */}
        <div className="seller-registration-step">
          <p className="seller-registration-step-description">
            Please fill in all the required information. Username will be verified automatically when you submit.
          </p>

          <form onSubmit={handleSubmit} className="seller-registration-form">
            <div className="profile-form-grid">
              <div className="form-field">
                <label className="form-label">Seller Username *</label>
                <input
                  type="text"
                  name="seller_username"
                  placeholder="Enter username (e.g., scale_seller)"
                  value={formData.seller_username}
                  onChange={handleChange}
                  className="form-input"
                  required
                  disabled={loading}
                  pattern="[a-zA-Z0-9_]+"
                  title="Username can only contain letters, numbers, and underscores"
                />
                <small className="form-hint">
                  Username will be verified automatically on submission
                </small>
              </div>

              <div className="form-field">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="full_name"
                  placeholder="Enter your full name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="form-input"
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-field">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-field">
                <label className="form-label">Mobile Number *</label>
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Enter mobile number"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="form-input"
                  required
                  disabled={loading}
                  pattern="[0-9]{10}"
                  title="Please enter a valid 10-digit mobile number"
                />
              </div>

              <div className="form-field">
                <label className="form-label">WhatsApp Number *</label>
                <input
                  type="tel"
                  name="whatsapp_number"
                  placeholder="Enter WhatsApp number"
                  value={formData.whatsapp_number}
                  onChange={handleChange}
                  className="form-input"
                  required
                  disabled={loading}
                  pattern="[0-9]{10}"
                  title="Please enter a valid 10-digit WhatsApp number"
                />
              </div>

              <div className="form-field">
                <label className="form-label">Listing Type *</label>
                <select
                  name="listing_type"
                  value={formData.listing_type}
                  onChange={handleChange}
                  className="form-input"
                  required
                  disabled={loading}
                >
                  <option value="Individual">Individual</option>
                  <option value="Dealer">Dealer</option>
                  <option value="Gallery">Gallery</option>
                  <option value="NGO">NGO</option>
                  <option value="Charity Partner">Charity Partner</option>
                </select>
              </div>

              <div className="form-field">
                <label className="form-label">City *</label>
                <input
                  type="text"
                  name="address_city"
                  placeholder="Enter city"
                  value={formData.address_city}
                  onChange={handleChange}
                  className="form-input"
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-field">
                <label className="form-label">State *</label>
                <input
                  type="text"
                  name="address_state"
                  placeholder="Enter state"
                  value={formData.address_state}
                  onChange={handleChange}
                  className="form-input"
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-field form-field-full">
                <label className="form-label">Country *</label>
                <input
                  type="text"
                  name="address_country"
                  placeholder="Enter country"
                  value={formData.address_country}
                  onChange={handleChange}
                  className="form-input"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="save-button-container">
              <button 
                type="submit" 
                className="btn-save"
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Complete Registration'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerRegistraion;