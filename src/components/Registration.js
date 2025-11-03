import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { post, setAuthToken } from './common/apiProvider';
import ToastMessage from './common/ToastMessage';
import '../assets/css/Login.css';
import logo from '../assets/images/logo.png';

const Registration = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('error');
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Hide toast when user starts typing
    if (showToast) setShowToast(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setToastMessage('Passwords do not match');
      setToastType('error');
      setShowToast(true);
      return;
    }

    setLoading(true);
    setShowToast(false);
    let response

    try {
      // Call the registration API endpoint - use relative path (API provider handles domain)
       response = await post('http://localhost:8080/api/register', {
        email: formData.email,
        password: formData.password
      });
      console.log("response",response);

      // Check if registration was successful
      if (response && response.success) {
        // Show success message
        setToastMessage(response.data);
        setToastType('success');
        setShowToast(true);
        
        // Store the token if provided
        if (response.data && typeof response.data === 'string') {
          setAuthToken(response.data);
        }
        
      } else if(response && response.success === false) {
        // Show error message from response
        const errorMsg = response.error?.message || 'Registration failed. Please try again.';
        console.log("errorMsg",errorMsg);
        setToastMessage(typeof errorMsg === 'string' ? errorMsg : JSON.stringify(errorMsg));
        setToastType('error');
        setShowToast(true);
      }
    } catch (err) {
      // Handle API errors - better error parsing
      // console.error('Registration error:', err.error);
      let errorMessage = "Email Already Exists";
      
      setToastMessage(errorMessage);
      setToastType('error');
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Left Branding Section */}
        <div className="branding-section">
          <div className="branding-content">
            <div className="logo-container">
              <div className="logo">
                <div className="logo-b"><img src={logo} alt="Auction Bharath" /></div>
              </div>
              <h1 className="brand-name">Auction Bharath</h1>
            </div>
            <div className="registration-prompt">
              <p>Already have an account?</p>
              <Link to="/login" className="register-link">Login</Link>
            </div>
          </div>
        </div>

        {/* Right Registration Form Section */}
        <div className="form-section">
          <div className="form-container">
            <h2 className="form-title">Registration</h2>

            {/* Toast Message */}
            {showToast && (
              <div style={{ marginBottom: '16px' }}>
                <ToastMessage
                  message={toastMessage}
                  type={toastType}
                  onClose={handleCloseToast}
                />
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  required
                  disabled={loading}
                />
              </div>

              <div className="input-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  required
                  disabled={loading}
                />
              </div>

              <div className="input-group">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-input"
                  required
                  disabled={loading}
                />
              </div>

              <button 
                type="submit" 
                className="login-button"
                disabled={loading}
                style={{
                  opacity: loading ? 0.6 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
