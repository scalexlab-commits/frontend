import React, { useState } from 'react';
import CurrentBids from './CurrentBids';
import PastBids from './PastBids';
import '../../../assets/css/common.css';

const Bids = () => {
    const [activeTab, setActiveTab] = useState('current_bids');
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="marketplace-container">
            {/* Integrated Search Bar with Tabs - Sticky */}
            <div className="marketplace-search-bar">
                {/* Left Side - Tabs */}
                <div className="marketplace-tabs">
                    <button
                        onClick={() => setActiveTab('current_bids')}
                        className={`marketplace-tab ${activeTab === 'current_bids' ? 'active' : ''}`}
                    >
                        Current Bids
                    </button>
                    <button
                        onClick={() => setActiveTab('Past_Bids')}
                        className={`marketplace-tab ${activeTab === 'Past_Bids' ? 'active' : ''}`}
                    >
                        Past Bids
                    </button>
                </div>

                {/* Middle - Search Input with Icon */}
                <div className="marketplace-search-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="marketplace-search-input"
                    />
                    <svg className="marketplace-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="11" cy="11" r="8" strokeWidth="2"/>
                        <path d="m21 21-4.35-4.35" strokeWidth="2"/>
                    </svg>
                </div>

                {/* Right Side - Filter Buttons */}
                <div className="marketplace-filters">
                    <button className="marketplace-filter-btn marketplace-filter-btn-primary">
                        Filters
                    </button>
                    <button className="marketplace-filter-btn marketplace-filter-btn-secondary">
                        Categories
                    </button>
                </div>
            </div>

            {/* Content based on active tab */}
            <div style={{ width: '98%', padding: '16px' }}>
                {activeTab === 'current_bids' && <CurrentBids />}
                {activeTab === 'Past_Bids' && <PastBids />}
            </div>
        </div>
    );
};

export default Bids;


