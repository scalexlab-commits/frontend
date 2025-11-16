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

// Base URL from environment variable - always use from .env file
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://auctionbharath.com';

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
  
  // Always use API_BASE_URL from .env file
  // Ensure endpoint doesn't have leading slash when building URL
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
    // If body is FormData, don't stringify and don't set Content-Type
    // Let the browser set it with the proper boundary
    if (body instanceof FormData) {
      config.body = body;
      // Remove Content-Type header for FormData to let browser set it
      delete config.headers['Content-Type'];
    } else {
      config.body = JSON.stringify(body);
    }
  }

  return config;
};

/**
 * Handles API response
 * Enhanced to handle various API response formats and preserve error data structure
 */
const handleResponse = async (response) => {
  // Try to parse response body first (for both success and error cases)
  let responseData = null;
  const contentType = response.headers.get('content-type');
  
  try {
    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }
  } catch (parseError) {
    // If parsing fails, use default error message
    responseData = null;
  }

  // Check if response is ok (status 200-299)
  if (!response.ok) {
    let errorMessage = 'An error occurred';
    let errorData = null;
    
    if (responseData) {
      // Preserve the full error data structure
      errorData = responseData;
      
      // Extract error message from various possible API response formats:
      // 1. { data: { message: "error" } }
      // 2. { message: "error" }
      // 3. { error: "error message" }
      // 4. { data: { error: "error message" } }
      // 5. { success: false, data: { message: "error" } }
      // 6. { errors: [...] } (validation errors)
      
      if (responseData.data?.message) {
        errorMessage = responseData.data.message;
      } else if (responseData.message) {
        errorMessage = responseData.message;
      } else if (responseData.data?.error) {
        errorMessage = responseData.data.error;
      } else if (responseData.error) {
        errorMessage = typeof responseData.error === 'string' 
          ? responseData.error 
          : responseData.error?.message || JSON.stringify(responseData.error);
      } else if (responseData.errors && Array.isArray(responseData.errors)) {
        // Handle validation errors array
        errorMessage = responseData.errors.map(err => 
          typeof err === 'string' ? err : err.message || JSON.stringify(err)
        ).join(', ');
      } else if (typeof responseData === 'string') {
        errorMessage = responseData;
      } else {
        // If no clear message, try to stringify the data
        errorMessage = JSON.stringify(responseData);
      }
    } else {
      errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    }

    // Create error object with full error data attached
    const error = new Error(errorMessage);
    error.status = response.status;
    error.statusText = response.statusText;
    error.data = errorData; // Attach full error data for component access
    error.response = responseData; // Also attach as 'response' for compatibility
    
    throw error;
  }

  // Success response - return the parsed data
  // The response might be in different formats:
  // - Direct data: { token: "...", user: {...} }
  // - Wrapped: { success: true, data: {...} }
  // - Mixed: { success: true, message: "...", data: {...} }
  return responseData;
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

