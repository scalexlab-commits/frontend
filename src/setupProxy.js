const { createProxyMiddleware } = require('http-proxy-middleware');

/**
 * Setup Proxy for Development
 * 
 * This file proxies API requests to avoid CORS issues during local development.
 * In production, the app will make direct requests to the API server.
 * 
 * Make sure http-proxy-middleware is installed:
 * npm install --save-dev http-proxy-middleware
 */

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.REACT_APP_API_BASE_URL || '',
      changeOrigin: true,
      secure: true,
      logLevel: 'debug',
      onProxyReq: (proxyReq, req, res) => {
        // Log the proxy request for debugging
        console.log('Proxying request:', req.method, req.url, '→', proxyReq.path);
      },
      onProxyRes: (proxyRes, req, res) => {
        // Add CORS headers to the response
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, PATCH, OPTIONS';
        proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, Accept';
      },
      onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.status(500).json({ error: 'Proxy error', message: err.message });
      }
    })
  );
};

