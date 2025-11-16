import React, { useState, useEffect } from 'react';
import { get, post } from '../../common/apiProvider';
import ToastMessage from '../../common/ToastMessage';
import '../../../assets/css/common.css';

const SellerProfile = () => {
  // Seller data states
  const [sellerData, setSellerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileError, setProfileError] = useState('');
  
  // Toast message states
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('error');
  const [showToast, setShowToast] = useState(false);
  
  // Verification modal states
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationFields, setVerificationFields] = useState([]);
  const [verificationFormData, setVerificationFormData] = useState({});
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [verificationSubmitting, setVerificationSubmitting] = useState(false);
  const [verificationError, setVerificationError] = useState('');

  // Fetch seller data on component mount
  useEffect(() => {
    fetchSellerData();
  }, []);

  const fetchSellerData = async () => {
    try {
      setLoading(true);
      setProfileError('');

      const response = await get('/api/seller');

      if (response.success || response) {
        const sellerDetails = response.data?.sellerDetaisl || response.data?.sellerDetails || response.sellerDetaisl || response.sellerDetails;
        if (sellerDetails) {
          setSellerData(sellerDetails);
        } else {
          setProfileError('No seller data found');
        }
      } else {
        setProfileError(response.message || 'Failed to fetch seller data');
      }
    } catch (err) {
      console.error('Error fetching seller data:', err);
      
      let errorMessage = 'Unable to fetch seller data. Please try again.';
      
      if (err.data) {
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
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setProfileError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenVerificationModal = async () => {
    setShowVerificationModal(true);
    setVerificationLoading(true);
    setVerificationError('');

    try {
      // Get sellerType from localStorage
      const sellerType = localStorage.getItem('isSellerType') || 'Individual';
      
      // Call API with sellerType as query parameter
      const response = await get(`/api/seller-form?sellerType=${encodeURIComponent(sellerType)}`);

      if (response.success) {
        const responseData = response.data.formFields;
        
        if (Array.isArray(responseData)) {
          // Filter and sort fields
          const sellerTypeLower = sellerType.toLowerCase();
          const filteredFields = responseData
            .filter(field => {
              const applicableFor = field.applicable_for?.toLowerCase() || '';
              return applicableFor === 'general' || applicableFor === sellerTypeLower;
            })
            .sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
          
          setVerificationFields(filteredFields);
          
          // Initialize form data with empty values
          const initialData = {};
          filteredFields.forEach(field => {
            initialData[field.field_name] = field.field_type === 'file' ? null : '';
          });
          setVerificationFormData(initialData);
        } else {
          setVerificationError('Invalid response format. Expected an array of fields.');
        }
      } else {
        setVerificationError(response.message || 'Failed to fetch verification form data');
      }
    } catch (err) {
      console.error('Error fetching verification form:', err);
      
      let errorMessage = 'Unable to fetch verification form. Please try again.';
      
      if (err.data) {
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
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setVerificationError(errorMessage);
    } finally {
      setVerificationLoading(false);
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    setVerificationSubmitting(true);
    setVerificationError('');

    try {
      // Validate required fields
      const missingFields = verificationFields
        .filter(field => field.is_required && !verificationFormData[field.field_name])
        .map(field => field.label);
      
      if (missingFields.length > 0) {
        setVerificationError(`Please fill in required fields: ${missingFields.join(', ')}`);
        setVerificationSubmitting(false);
        return;
      }

      // Prepare form data for submission
      const submitData = new FormData();
      
      verificationFields.forEach(field => {
        const value = verificationFormData[field.field_name];
        if (value !== null && value !== undefined && value !== '') {
          if (field.field_type === 'file' && value instanceof File) {
            submitData.append(field.field_name, value);
          } else if (field.field_type !== 'file') {
            submitData.append(field.field_name, value);
          }
        }
      });

      // Submit form data for verification
      const response = await post('/api/seller-verification', submitData);

      if (response.success || response) {
        setToastMessage(response.data?.message || response.message || 'Verification submitted successfully!');
        setToastType('success');
        setShowToast(true);
        setShowVerificationModal(false);
        
        // Reset verification form
        setVerificationFormData({});
        setVerificationFields([]);
      } else {
        const errorMsg = response.data?.message || response.message || response.error?.message || 'Failed to submit verification.';
        setVerificationError(typeof errorMsg === 'string' ? errorMsg : JSON.stringify(errorMsg));
      }
    } catch (err) {
      console.error('Error submitting verification:', err);
      
      let errorMessage = 'Unable to submit verification. Please try again.';
      
      if (err.data) {
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
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setVerificationError(errorMessage);
    } finally {
      setVerificationSubmitting(false);
    }
  };


  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 60) return '1 month ago';
    const months = Math.floor(diffDays / 30);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="seller-profile">
      {/* <h2 className="seller-section-title">Profile</h2> */}
      <div className="seller-profile-content">
        {showToast && (
          <div style={{ marginBottom: '16px' }}>
            <ToastMessage
              message={toastMessage}
              type={toastType}
              onClose={() => setShowToast(false)}
            />
          </div>
        )}

        {loading && (
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <p>Loading profile...</p>
          </div>
        )}

        {profileError && (
          <div style={{
            padding: '12px',
            background: '#fee',
            color: '#c33',
            borderRadius: '6px',
            marginBottom: '16px',
            fontSize: '14px'
          }}>
            {profileError}
          </div>
        )}

        {!loading && !profileError && sellerData && (
          <div className="seller-profile-display">
            {/* Header with Gradient Background */}
            <div className="seller-profile-header">
              <div className="seller-profile-header-content">
                {/* Profile Picture and Info */}
                <div className="seller-profile-info">
                  <div className="seller-profile-picture">
                    <div className="seller-profile-picture-placeholder">
                      {sellerData.full_name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                  </div>
                  <div className="seller-profile-name-section">
                    <h3 className="seller-profile-name">{sellerData.full_name || 'Seller Name'}</h3>
                    <p className="seller-profile-email">{sellerData.email || ''}</p>
                  </div>
                </div>
                {/* Edit Button */}
                <button className="seller-profile-edit-btn">
                  Edit
                </button>
              </div>
            </div>

            {/* Profile Details Form */}
            <div className="seller-profile-details">
              <div className="seller-profile-form-grid">
                {/* Left Column */}
                <div className="seller-profile-form-column">
                  <div className="seller-profile-form-field">
                    <label className="seller-profile-form-label">Full Name</label>
                    <input
                      type="text"
                      value={sellerData.full_name || ''}
                      readOnly
                      className="seller-profile-form-input"
                      placeholder="Your First Name"
                    />
                  </div>
                  <div className="seller-profile-form-field">
                    <label className="seller-profile-form-label">Seller Type</label>
                    <div className="seller-profile-form-select-wrapper">
                      <input
                        type="text"
                        value={sellerData.listing_type || ''}
                        readOnly
                        className="seller-profile-form-input"
                        placeholder="Your First Name"
                      />
                    </div>
                  </div>
                  <div className="seller-profile-form-field">
                    <label className="seller-profile-form-label">Mobile Number</label>
                    <div className="seller-profile-form-select-wrapper">
                      <input
                        type="text"
                        value={sellerData.mobile || ''}
                        readOnly
                        className="seller-profile-form-input"
                      />
                    </div>
                  </div>
                  <div className="seller-profile-form-field">
                    <label className="seller-profile-form-label">State</label>
                    <div className="seller-profile-form-select-wrapper">
                      <input
                        type="text"
                        value={sellerData.address_state || ''}
                        readOnly
                        className="seller-profile-form-input"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="seller-profile-form-column">
                  <div className="seller-profile-form-field">
                    <label className="seller-profile-form-label">Seller ID</label>
                    <input
                      type="text"
                      value={sellerData.seller_username || ''}
                      readOnly
                      className="seller-profile-form-input"
                      placeholder="Your First Name"
                    />
                  </div>
                  <div className="seller-profile-form-field">
                    <label className="seller-profile-form-label">Country</label>
                    <div className="seller-profile-form-select-wrapper">
                      <input
                        type="text"
                        value={sellerData.address_country || ''}
                        readOnly
                        className="seller-profile-form-input"
                        placeholder="Your First Name"
                      />

                    </div>
                  </div>
                  <div className="seller-profile-form-field">
                    <label className="seller-profile-form-label">Whatsapp Number</label>
                    <div className="seller-profile-form-select-wrapper">
                      <input
                        type="text"
                        value={sellerData.whatsapp_number || ''}
                        readOnly
                        className="seller-profile-form-input"
                        placeholder="Your First Name"
                      />
                    </div>
                  </div>
                  <div className="seller-profile-form-field">
                    <label className="seller-profile-form-label">City</label>
                    <div className="seller-profile-form-select-wrapper">
                      <input
                        type="text"
                        value={sellerData.address_city || ''}
                        readOnly
                        className="seller-profile-form-input"
                        placeholder="Your First Name"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Address Section */}
              <div className="seller-profile-email-section">
                <h4 className="seller-profile-email-title">My email Address</h4>
                <div className="seller-profile-email-item">
                  <div className="seller-profile-email-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <div className="seller-profile-email-info">
                    <p className="seller-profile-email-address">{sellerData.email || ''}</p>
                    <p className="seller-profile-email-date">{formatDate(sellerData.created_at)}</p>
                  </div>
                </div>
                <button className="seller-profile-add-email-btn">
                  + Add Email Address
                </button>
              </div>

              {/* Verify Now Button */}
              <div style={{ marginTop: '32px', textAlign: 'center' }}>
                <button
                  onClick={handleOpenVerificationModal}
                  className="btn-save"
                  style={{
                    background: '#3B82F6',
                    padding: '14px 40px',
                    fontSize: '16px',
                    fontWeight: '600',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#2563EB'}
                  onMouseLeave={(e) => e.target.style.background = '#3B82F6'}
                >
                  Verify Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Verification Modal */}
      {showVerificationModal && (
        <VerificationModal
          onClose={() => setShowVerificationModal(false)}
          fields={verificationFields}
          formData={verificationFormData}
          setFormData={setVerificationFormData}
          loading={verificationLoading}
          submitting={verificationSubmitting}
          error={verificationError}
          onSubmit={handleVerificationSubmit}
        />
      )}
    </div>
  );
};

// Verification Modal Component
const VerificationModal = ({
  onClose,
  fields,
  formData,
  setFormData,
  loading,
  submitting,
  error,
  onSubmit
}) => {
  const handleInputChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleFileChange = (fieldName, file) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: file
    }));
  };

  const renderField = (field) => {
    const fieldValue = formData[field.field_name] || '';

    if (field.field_type === 'file') {
      const acceptedTypes = field.file_allowed_types 
        ? field.file_allowed_types.split(',').map(type => `.${type.trim()}`).join(',')
        : '.jpg,.png,.pdf';
      
      return (
        <div key={field.id} className="form-field">
          <label className="form-label">
            {field.label}
            {field.is_required && <span style={{ color: '#ef4444' }}> *</span>}
          </label>
          <input
            type="file"
            accept={acceptedTypes}
            onChange={(e) => handleFileChange(field.field_name, e.target.files[0] || null)}
            className="form-input"
            required={field.is_required}
            disabled={submitting}
          />
          {field.help_text && (
            <small className="form-hint">{field.help_text}</small>
          )}
          {fieldValue instanceof File && (
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#059669' }}>
              Selected: {fieldValue.name}
            </div>
          )}
        </div>
      );
    }

    if (field.field_type === 'text') {
      return (
        <div key={field.id} className="form-field">
          <label className="form-label">
            {field.label}
            {field.is_required && <span style={{ color: '#ef4444' }}> *</span>}
          </label>
          <input
            type="text"
            value={fieldValue}
            onChange={(e) => handleInputChange(field.field_name, e.target.value)}
            className="form-input"
            required={field.is_required}
            disabled={submitting}
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
          {field.help_text && (
            <small className="form-hint">{field.help_text}</small>
          )}
        </div>
      );
    }

    // Default: render as text input
    return (
      <div key={field.id} className="form-field">
        <label className="form-label">
          {field.label}
          {field.is_required && <span style={{ color: '#ef4444' }}> *</span>}
        </label>
        <input
          type="text"
          value={fieldValue}
          onChange={(e) => handleInputChange(field.field_name, e.target.value)}
          className="form-input"
          required={field.is_required}
          disabled={submitting}
          placeholder={`Enter ${field.label.toLowerCase()}`}
        />
        {field.help_text && (
          <small className="form-hint">{field.help_text}</small>
        )}
      </div>
    );
  };

  return (
    <div className="verification-modal-overlay" onClick={onClose}>
      <div className="verification-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="verification-modal-header">
          <h2 className="verification-modal-title">Submit for Verification</h2>
          <button
            onClick={onClose}
            className="verification-modal-close"
            disabled={submitting}
          >
            ×
          </button>
        </div>

        <div className="verification-modal-body">
          {loading && (
            <div style={{ padding: '40px', textAlign: 'center' }}>
              <p>Loading verification form...</p>
            </div>
          )}

          {error && (
            <div style={{
              padding: '12px',
              background: '#fee',
              color: '#c33',
              borderRadius: '6px',
              marginBottom: '16px',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          {!loading && !error && fields.length > 0 && (
            <form onSubmit={onSubmit} className="verification-form">
              <div className="profile-form-grid">
                {fields.map(field => renderField(field))}
              </div>

              <div className="verification-modal-footer">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-cancel"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-save"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Submit for Verification'}
                </button>
              </div>
            </form>
          )}

          {!loading && !error && fields.length === 0 && (
            <p>No verification fields available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;

