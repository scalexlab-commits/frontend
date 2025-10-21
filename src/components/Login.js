import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Login.css';
import logo from '../assets/images/logo.png';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login form submitted:', formData);
    // Add your login logic here
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
    // Add your Google login logic here
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Left Branding Section */}
        <div className="branding-section">
          <div className="branding-content">
            <div className="logo-container">
              <div className="logo">
                <div className="logo-b"><img src={logo}></img></div>
              </div>
              <h1 className="brand-name">Auction Bharath</h1>
            </div>
            <div className="registration-prompt">
              <p>Don't have an account?</p>
              <Link to="/register" className="register-link">Register Now</Link>
            </div>
          </div>
        </div>

        {/* Right Login Form Section */}
        <div className="form-section">
          <div className="form-container">
            <h2 className="form-title">User login</h2>
            
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
                />
              </div>

              <button type="submit" className="login-button">
                Login
              </button>
            </form>

            <div className="divider">
              <span className="divider-text">OR</span>
            </div>

            <button onClick={handleGoogleLogin} className="google-login-button">
              <div className="google-icon">
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 002.38-5.88c0-.57-.05-.66-.15-1.18z"/>
                  <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2.04a4.8 4.8 0 01-7.18-2.53H1.83v2.07A8 8 0 008.98 17z"/>
                  <path fill="#FBBC05" d="M4.5 10.49a4.8 4.8 0 010-3.02V5.4H1.83a8 8 0 000 7.17l2.67-2.08z"/>
                  <path fill="#EA4335" d="M8.98 4.5c1.16 0 2.19.4 3.01 1.2l2.28-2.28A7.8 7.8 0 008.98 1a8 8 0 00-7.15 4.4l2.67 2.09c.63-1.88 2.4-3.09 4.48-3.09z"/>
                </svg>
              </div>
              Login with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
