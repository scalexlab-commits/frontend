import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Login.css';
import logo from '../assets/images/logo.png';

const Registration = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add registration logic here
    console.log('Registration form submitted:', formData);
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

              <div className="input-group">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <button type="submit" className="login-button">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
