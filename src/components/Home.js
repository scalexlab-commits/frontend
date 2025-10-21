import React, { useState } from 'react';
import logo from '../assets/images/logo.png';
 // If you have custom CSS

const ComingSoon = () => {
  const [email, setEmail] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [responseColor, setResponseColor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMessage('');
    setResponseColor('');

    try {
      const res = await fetch('/api/subscribe-us', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setResponseMessage('✅ Thank you for subscribing!');
        setResponseColor('green');
        setEmail('');
      } else {
        const errorData = await res.json();
        setResponseMessage(errorData.message || '❌ Subscription failed. Please try again.');
        setResponseColor('red');
      }
    } catch (err) {
      console.error('Error:', err);
      setResponseMessage('❌ Network error. Please try again later.');
      setResponseColor('red');
    }
  };

  return (
    <div className="coming-soon-container">
      <div className="content-panel">
        <h1 className="headline">
          We Are <br /> Coming Soon
        </h1>
        <p className="subhead">
          To be India’s most trusted and culturally rooted digital auction marketplace 
          where heritage, art, collectibles, and modern icons converge.
        </p>

        <div className="newsletter-section">
          <label htmlFor="email-input" className="newsletter-label">News Letter</label>
          <form id="subscribe-form" className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              id="email-input"
              placeholder="Email"
              className="email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="subscribe-button">Subscribe</button>
          </form>
          <p id="response-message" style={{ color: responseColor }}>
            {responseMessage}
          </p>
        </div>
      </div>

      <div className="logo-panel">
        <div className="col" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="row">
            <img src={logo} alt="Auction Bharat Logo" className="logo" />
          </div>
          <div className="row">
            <p className="headline">Auction Bharat</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
