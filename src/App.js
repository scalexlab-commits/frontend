import React,{useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import NavBar from './components/common/NavBar.jsx';
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
import SellerRegistraion from './components/customer/SellerRegistraion.jsx';

function AppContent() {
  const [isSeller, setIsSeller] = useState(false); // Example state for seller status
  const location = useLocation();
  
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<MarketPlace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/market" element={<MarketPlace />} />
        <Route path="/bids" element={<Bids />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/profile" element={<RegistrationForm />} />
        <Route path="/SellerSettings" element={<SellerSettings />} />
         <Route path="/Seller-registration" element={<SellerRegistraion />} />
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
