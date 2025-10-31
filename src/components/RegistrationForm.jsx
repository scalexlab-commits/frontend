import React, { useState } from 'react';

const RegistrationForm = () => {
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face');

  const handleChangePhoto = () => {
    // Create file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setProfileImage(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleRemovePhoto = () => {
    setProfileImage('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face');
  };

  return (
    <div className="profile-container">
      {/* Profile Title */}
      <h1 className="profile-title">
        Profile
      </h1>
      
      {/* Divider Line */}
      <div className="profile-divider"></div>

      {/* Profile Picture Section */}

      {/* Additional Profile Form Fields */}
      <div className="profile-form-grid">
        <div className="form-field">
          <label className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="Enter your first name"
          />
        </div>

        <div className="form-field">
          <label className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="Enter your last name"
          />
        </div>

        <div className="form-field">
          <label className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-input"
            placeholder="Enter your email"
          />
        </div>

        <div className="form-field">
          <label className="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            className="form-input"
            placeholder="Enter your phone number"
          />
        </div>

        <div className="form-field">
          <label className="form-label">
            PAN Card Number
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="Enter your PAN card number"
            maxLength="10"
          />
        </div>

        <div className="form-field">
          <label className="form-label">
            Aadhar Card Number
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="Enter your Aadhar card number"
            maxLength="12"
          />
        </div>

        <div className="form-field">
          <label className="form-label">
            GST Number
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="Enter your GST number"
            maxLength="15"
          />
        </div>

        <div className="form-field form-field-full">
          <label className="form-label">
            Registered Address as per GST
          </label>
          <textarea
            className="form-textarea"
            placeholder="Enter your registered address as per GST"
            rows="4"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="save-button-container">
        <button className="btn-save">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default RegistrationForm;