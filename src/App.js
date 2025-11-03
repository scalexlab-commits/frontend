import React,{useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import Home from './components/Home';
import './assets/css/common.css';
import './assets/css/App.css';
import MarketPlace from './components/customer/MarketPlace.jsx';
import Bids from './components/customer/Bids/Bids.jsx';
import Orders from './components/customer/Orders.jsx';
import ProductDetail from './components/customer/ProductDetail.jsx';
import logo from './assets/images/logo.png';
import NotificationWidget from './components/NotificationWidget';
import RegistrationForm from './components/RegistrationForm.jsx';
import SellerSettings from './components/seller/SellerSettings/SellerSettings.jsx';

function AppContent() {
  const [isSeller, setIsSeller] = useState(true); // Example state for seller status
  const location = useLocation();
  const showMarketNav = /^\/(market|bids|orders|profile|product)(\/.*)?$/.test(location.pathname);

  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo-section">
            {/* <img src={logo} alt="Logo" className="nav-logo-image" /> */}
            <Link to="/" className="nav-logo">
              Auction Bharat
            </Link>
          </div>
          {showMarketNav ?
            <div className='nav-menu'>
              <Link 
                to="/market" 
                className={`nav-link ${location.pathname === '/market' ? 'active' : ''}`}
              >
                Market Place
              </Link>
              <Link 
                to="/bids" 
                className={`nav-link ${location.pathname === '/bids' ? 'active' : ''}`}
              >
                Bids
              </Link>
              <Link 
                to="/orders" 
                className={`nav-link ${location.pathname === '/orders' ? 'active' : ''}`}
              >
                Orders
              </Link>
            </div> : null}
            
          {!showMarketNav ?
            <div className="nav-menu">
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/registration" className="nav-link">Register</Link>
            </div> :
            <div className="nav-menu">
              <Link to="/login" className="nav-link">Profile</Link>
              {isSeller?<Link to="/SellerSettings"className='Seller' >Seller Settings</Link>:<button className='Seller'>Become Seller</button>}
              
              {/* <Link to="/registration" className="nav-link">Register</Link> */}
            </div>
          }

        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/market" element={<MarketPlace />} />
        <Route path="/bids" element={<Bids />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/profile" element={<RegistrationForm />} />
        <Route path="/SellerSettings" element={<SellerSettings />} />
      </Routes>
      <NotificationWidget />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
