/**
 * Centralized API Provider
 * 
 * This module provides a centralized API client that handles all HTTP requests.
 * Simply import the API methods and pass the endpoint.
 * 
 * Usage Examples:
 * 
 * GET request:
 *   import { get } from './components/common/apiProvider';
 *   const data = await get('/api/products');
 * 
 * POST request:
 *   import { post } from './components/common/apiProvider';
 *   const result = await post('/api/products', { name: 'Product Name' });
 * 
 * PUT request:
 *   import { put } from './components/common/apiProvider';
 *   const updated = await put('/api/products/1', { name: 'Updated Name' });
 * 
 * DELETE request:
 *   import { del } from './components/common/apiProvider';
 *   await del('/api/products/1');
 * 
 * With custom headers:
 *   const data = await get('/api/products', { headers: { 'Authorization': 'Bearer token' } });
 */

// Base URL from environment variable
// In development: use relative URLs (proxy handles CORS)
// In production: use full URL from .env
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? (process.env.REACT_APP_API_BASE_URL || 'https://auctionbharath.com')
  : ''; // Empty string = relative URL (uses proxy in development)

/**
 * Default configuration for API requests
 */
const defaultConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  // CORS configuration
  mode: 'cors',
  credentials: 'omit', // Change to 'include' if you need to send cookies
};

/**
 * Gets authentication token from localStorage (if using token-based auth)
 */
const getAuthToken = () => {
  return localStorage.getItem('authToken') || null;
};

/**
 * Builds full URL from endpoint
 */
const buildURL = (endpoint) => {
  // If endpoint already includes http/https, use it as is
  if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
    return endpoint;
  }
  
  // In development: use relative URL (proxy will handle it)
  // In production: use full URL with domain from .env
  if (API_BASE_URL === '') {
    // Development mode - use relative URL (proxy handles CORS)
    // Ensure endpoint starts with / for proper proxy routing
    return endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  }
  
  // Production mode - build full URL
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${API_BASE_URL}/${cleanEndpoint}`;
};

/**
 * Builds request configuration
 */
const buildConfig = (method, body = null, customConfig = {}) => {
  const config = {
    method,
    ...defaultConfig,
    ...customConfig,
    headers: {
      ...defaultConfig.headers,
      ...customConfig.headers,
    },
  };

  // Add authentication token if available
  const token = getAuthToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  // Add body for POST, PUT, PATCH requests
  if (body) {
    config.body = JSON.stringify(body);
  }

  return config;
};

/**
 * Handles API response
 */
const handleResponse = async (response) => {
  // Check if response is ok (status 200-299)
  if (!response.ok) {
    let errorMessage = 'An error occurred';
    
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch (e) {
      // If response is not JSON, get text
      try {
        errorMessage = await response.text() || errorMessage;
      } catch (textError) {
        errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      }
    }

    const error = new Error(errorMessage);
    error.status = response.status;
    error.statusText = response.statusText;
    throw error;
  }

  // Try to parse JSON, return text if not JSON
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  }
  
  return await response.text();
};

/**
 * Main API request function
 */
const apiRequest = async (endpoint, method = 'GET', body = null, customConfig = {}) => {
  try {
    const url = buildURL(endpoint);
    const config = buildConfig(method, body, customConfig);

    const response = await fetch(url, config);
    return await handleResponse(response);
  } catch (error) {
    // Enhanced error logging with CORS detection
    const errorInfo = {
      endpoint,
      error: error.message,
      status: error.status,
    };

    // Check for CORS errors
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      errorInfo.corsError = true;
      errorInfo.message = 'CORS Error: The API server needs to allow requests from this origin. Please check server CORS configuration.';
      console.error(`API ${method} CORS Error:`, errorInfo);
    } else {
      console.error(`API ${method} Error:`, errorInfo);
    }
    
    // Re-throw error for component handling
    throw error;
  }
};

/**
 * GET request
 * @param {string} endpoint - API endpoint (e.g., '/api/products')
 * @param {object} config - Optional custom configuration (headers, etc.)
 * @returns {Promise} - Response data
 */
export const get = async (endpoint, config = {}) => {
  return apiRequest(endpoint, 'GET', null, config);
};

/**
 * POST request
 * @param {string} endpoint - API endpoint (e.g., '/api/products')
 * @param {object} data - Request body data
 * @param {object} config - Optional custom configuration (headers, etc.)
 * @returns {Promise} - Response data
 */
export const post = async (endpoint, data = null, config = {}) => {
  return apiRequest(endpoint, 'POST', data, config);
};

/**
 * PUT request
 * @param {string} endpoint - API endpoint (e.g., '/api/products/1')
 * @param {object} data - Request body data
 * @param {object} config - Optional custom configuration (headers, etc.)
 * @returns {Promise} - Response data
 */
export const put = async (endpoint, data = null, config = {}) => {
  return apiRequest(endpoint, 'PUT', data, config);
};

/**
 * PATCH request
 * @param {string} endpoint - API endpoint (e.g., '/api/products/1')
 * @param {object} data - Request body data
 * @param {object} config - Optional custom configuration (headers, etc.)
 * @returns {Promise} - Response data
 */
export const patch = async (endpoint, data = null, config = {}) => {
  return apiRequest(endpoint, 'PATCH', data, config);
};

/**
 * DELETE request
 * @param {string} endpoint - API endpoint (e.g., '/api/products/1')
 * @param {object} config - Optional custom configuration (headers, etc.)
 * @returns {Promise} - Response data
 */
export const del = async (endpoint, config = {}) => {
  return apiRequest(endpoint, 'DELETE', null, config);
};

/**
 * Set authentication token in localStorage
 * @param {string} token - Authentication token
 */
export const setAuthToken = (token) => {
  localStorage.setItem('authToken', token);
};

/**
 * Remove authentication token from localStorage
 */
export const removeAuthToken = () => {
  localStorage.removeItem('authToken');
};

/**
 * Get current authentication token
 * @returns {string|null} - Authentication token or null
 */
export const getAuthTokenValue = () => {
  return getAuthToken();
};

/**
 * Get API base URL (useful for debugging or other purposes)
 * @returns {string} - API base URL
 */
export const getApiBaseUrl = () => {
  return API_BASE_URL;
};

// Default export with all methods
const apiProvider = {
  get,
  post,
  put,
  patch,
  delete: del,
  setAuthToken,
  removeAuthToken,
  getAuthToken: getAuthTokenValue,
  getApiBaseUrl,
};

export default apiProvider;

