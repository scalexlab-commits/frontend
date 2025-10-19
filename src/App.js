import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              Auction Bharat
            </Link>
            <div className="nav-menu">
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/registration" className="nav-link">Register</Link>
            </div>
          </div>
        </nav>
        
        <Routes>
          <Route path="/" element={
            <div className="home">
              <h1>Welcome to Auction Bharat</h1>
              <p>Your premier online auction platform</p>
              <div className="home-buttons">
                <Link to="/login" className="btn btn-primary">Login</Link>
                <Link to="/registration" className="btn btn-secondary">Register</Link>
              </div>
            </div>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
