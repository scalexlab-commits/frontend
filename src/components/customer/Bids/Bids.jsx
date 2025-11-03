import React, { useState } from 'react';
import CurrentBids from './CurrentBids';
import PastBids from './PastBids';

const Bids = () => {
    const [activeTab, setActiveTab] = useState('current_bids');
    return (
        <div style={{ padding: '' }}>
            <div style={{
                position: 'sticky',
                top: '0',
                zIndex: '101',
                background: 'white',
                padding: '1rem 0',
                borderBottom: '1px solid #e5e7eb'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '0',
                }}>
                    <button
                        onClick={() => setActiveTab('current_bids')}
                        style={{
                            padding: '12px 24px',
                            border: '1px solid #ff6b35',
                            borderRadius: '6px',
                            background: activeTab === 'current_bids' ? '#ff6b35' : 'white',
                            color: activeTab === 'current_bids' ? 'white' : '#ff6b35',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '500',
                            transition: 'all 0.3s ease',
                            marginRight: '8px'
                        }}
                    >
                        Current Bids
                    </button>

                    <button
                        onClick={() => setActiveTab('Past_Bids')}
                        style={{
                            padding: '12px 24px',
                            border: '1px solid #ff6b35',
                            borderRadius: '6px',
                            background: activeTab === 'Past_Bids' ? '#ff6b35' : 'white',
                            color: activeTab === 'Past_Bids' ? 'white' : '#ff6b35',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '500',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Past Bids
                    </button>
                </div>
            </div>
            {/* filter part  */}
            <div style={{
                position: 'sticky',
                top: '70px',
                zIndex: '100',
                background: 'white',
                borderRadius: '8px',
                padding: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                // boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                <span></span>

                {/* Right Side - Search, Categories and Filters */}
                <div style={{
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'center'
                }}>
                    {/* Search Input */}
                    <input
                        type="text"
                        placeholder="Search"
                        style={{
                            height: '5px',
                            // width: '200px',
                            padding: '12px 16px',
                            border: '1px solid #3A485A',
                            borderRadius: '5px',
                            fontSize: '14px',
                            outline: 'none',
                            background: 'white'
                        }}
                    />

                    {/* Categories Dropdown */}
                    <button
                        style={{
                            padding: '6px 10px',
                            // height:'20px',
                            // border: 'none',
                            borderRadius: '5px',
                            background: '#3A485A',
                            color: 'white',
                            fontSize: '14px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',

                        }}
                    >
                        Categories
                        <span style={{ fontSize: '12px' }}>▼</span>
                    </button>

                    {/* Filters Dropdown */}
                    <button
                        style={{
                            padding: '6px 10px',
                            // border: 'none',
                            borderRadius: '5px',
                            background: '#3A485A',
                            color: 'white',
                            fontSize: '14px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        }}
                    >
                        Filters
                        <span style={{ fontSize: '12px' }}>▼</span>
                    </button>
                </div>
            </div>

            <div style={{ width: '98%' }}>
                {activeTab === 'current_bids' &&
                    <CurrentBids />}
                {activeTab === 'Past_Bids' &&
                    <PastBids />}    

            </div>

        </div>
    );
};

export default Bids;


