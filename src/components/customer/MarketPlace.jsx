import React, { useState } from 'react';
import ProductCard from './ProductCard';
import AuctionCard from './AuctionCard';

const MarketPlace = () => {
    const [activeTab, setActiveTab] = useState('all-products');

    return (
        <div style={{ padding: '2rem' }}>
            {/* Tab Buttons - Sticky */}
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
                        onClick={() => setActiveTab('auctions')}
                        style={{
                            padding: '12px 24px',
                            border: '1px solid #ff6b35',
                            borderRadius: '6px',
                            background: activeTab === 'auctions' ? '#ff6b35' : 'white',
                            color: activeTab === 'auctions' ? 'white' : '#ff6b35',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '500',
                            transition: 'all 0.3s ease',
                            marginRight: '8px'
                        }}
                    >
                        Auctions
                    </button>

                    <button
                        onClick={() => setActiveTab('all-products')}
                        style={{
                            padding: '12px 24px',
                            border: '1px solid #ff6b35',
                            borderRadius: '6px',
                            background: activeTab === 'all-products' ? '#ff6b35' : 'white',
                            color: activeTab === 'all-products' ? 'white' : '#ff6b35',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '500',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        All Products
                    </button>
                </div>
            </div>

            {/* Search and Filter Bar - Sticky */}
            <div style={{
                position: 'sticky',
                top: '80px',
                zIndex: '100',
                background: '#f5f5f5',
                borderRadius: '8px',
                padding: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                {/* Left Side - All Products Text */}
                {activeTab === 'all-products' && (
                    <h2 style={{ 
                        margin: 0, 
                        fontSize: '1.5rem', 
                        color: '#333',
                        fontWeight: '600'
                    }}>
                        All Products
                    </h2>
                )}

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
                            width: '200px',
                            padding: '12px 16px',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '14px',
                            outline: 'none',
                            background: 'white'
                        }}
                    />
                    
                    {/* Categories Dropdown */}
                    <button
                        style={{
                            padding: '12px 16px',
                            border: 'none',
                            borderRadius: '6px',
                            background: 'white',
                            color: '#333',
                            fontSize: '14px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            minWidth: '120px'
                        }}
                    >
                        Categories
                        <span style={{ fontSize: '12px' }}>▼</span>
                    </button>

                    {/* Filters Dropdown */}
                    <button
                        style={{
                            padding: '12px 16px',
                            border: 'none',
                            borderRadius: '6px',
                            background: 'white',
                            color: '#333',
                            fontSize: '14px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            minWidth: '100px'
                        }}
                    >
                        Filters
                        <span style={{ fontSize: '12px' }}>▼</span>
                    </button>
                </div>
            </div>

            {/* Content based on active tab */}
            {activeTab === 'auctions' && (
                <div style={{ padding: '2rem 0' }}>
                    <div style={{ 
                        display: 'flex', 
                        flexDirection: 'column',
                        gap: '1rem',
                        alignItems: 'center'
                    }}>
                        <AuctionCard 
                            title="Vintage Rolex Submariner Watch"
                            description="Rare 1960s Rolex Submariner in excellent condition with original box and papers. A true collector's piece."
                            currentBid="$12,500"
                            timeLeft="2h 34m 18s"
                            totalBids="47"
                            bidIncrement="$500"
                            imageUrl="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop"
                            isLive={true}
                        />
                        
                        <AuctionCard 
                            title="Antique Omega Speedmaster"
                            description="Classic 1970s Omega Speedmaster with original bracelet and documentation. Perfect for collectors."
                            currentBid="$8,750"
                            timeLeft="1h 15m 42s"
                            totalBids="23"
                            bidIncrement="$250"
                            imageUrl="https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=400&h=300&fit=crop"
                            isLive={true}
                        />
                        
                        <AuctionCard 
                            title="Vintage Cartier Tank Watch"
                            description="Elegant 1980s Cartier Tank in pristine condition. A timeless piece of horological history."
                            currentBid="$6,200"
                            timeLeft="3h 45m 12s"
                            totalBids="31"
                            bidIncrement="$200"
                            imageUrl="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=300&fit=crop"
                            isLive={true}
                        />
                    </div>
                </div>
            )}

            {activeTab === 'all-products' && (
                <div style={{ padding: '2rem 0' }}>
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                        gap: '1rem',
                        justifyContent: 'center'
                    }}>
                        <ProductCard />
                        <ProductCard 
                            productName="Adidas Running Shoe"
                            price="$59.99"
                            size="EU40"
                            color="WHITE/BLACK"
                            description="Comfortable running shoe with modern design and superior cushioning."
                        />
                        <ProductCard 
                            productName="Puma Sports Shoe"
                            price="$49.99"
                            size="EU39"
                            color="BLUE/WHITE"
                            description="Lightweight sports shoe perfect for daily activities and workouts."
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default MarketPlace;

