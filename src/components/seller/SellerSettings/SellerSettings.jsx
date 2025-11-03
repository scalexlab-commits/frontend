import React, { useState } from 'react';
import Dashboard from './Dashboard';
import SellerProfile from './SellerProfile';
import AddProduct from './AddProduct';
import ProductList from './ProductList';
import '../../../assets/css/common.css';
import AuctionList from './AuctionList';

const SellerSettings = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Object mapping tab keys to their components and labels
  const tabs = {
    dashboard: {
      label: 'Dashboard',
      component: Dashboard
    },
    profile: {
      label: 'Profile',
      component: SellerProfile
    },
    addProduct: {
      label: 'Add Product',
      component: AddProduct
    },
    productList: {
      label: 'Product List',
      component: ProductList
    },
    auctionList: {
      label: 'Auction List',
      component: AuctionList
    }
  };

  const ActiveComponent = tabs[activeTab].component;

  return (
    <div className="seller-settings-container">
      {/* Left Sidebar */}
      <div className="seller-sidebar">
        <div className="seller-sidebar-header">
          <h2>Seller Settings</h2>
        </div>
        <nav className="seller-sidebar-nav">
          {Object.entries(tabs).map(([key, { label }]) => (
            <button
              key={key}
              className={`seller-nav-item ${activeTab === key ? 'active' : ''}`}
              onClick={() => setActiveTab(key)}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Right Content Area */}
      <div className="seller-content-area">
        <ActiveComponent />
      </div>
    </div>
  );
};

export default SellerSettings;