import React, { useState } from 'react';
import ProductCard from './ProductCard';
import AuctionCard from './AuctionCard';
import '../../assets/css/common.css';

const MarketPlace = () => {
    const [activeTab, setActiveTab] = useState('all-products');

    return (
        <div style={{ padding: '' }}>
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
                {/* Left Side - All Products Text */}
                {/* {activeTab === 'all-products' ? (
                    <h2 style={{ 
                        margin: 0, 
                        fontSize: '1.5rem', 
                        color: '#333',
                        fontWeight: '600'
                    }}>
                        All Products
                    </h2>
                ): (
                    <h2 style={{ 
                        margin: 0, 
                        fontSize: '1.5rem', 
                        color: '#333',
                        fontWeight: '600'
                    }}>
                        All Auctions
                    </h2>
                )} */}
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
                            height:'5px',
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

            {/* Content based on active tab */}
            {activeTab === 'auctions' && (
                <div>
                    {/* Live Auctions Section */}
                    <div style={{ marginBottom: '3rem' }}>
                        <h2 style={{
                            // fontSize: '1.75rem',
                            // fontWeight: '700',
                            color: '#1F2937',
                            // marginBottom: '1.5rem',
                            // paddingBottom: '0.75rem',
                            borderBottom: '2px solid #ff6b35'
                        }}>
                            Live Auctions
                        </h2>
                        <div style={{ 
                            display: 'flex', 
                            flexDirection: 'column',
                            gap: '1.5rem',
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
                                isBidInitiated={false}
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
                                isBidInitiated={true}
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
                                isBidInitiated={false}
                            />
                        </div>
                    </div>

                    {/* Upcoming Auctions Section */}
                    <div style={{ marginBottom: '3rem' }}>
                        <h2 style={{
                            fontSize: '1.75rem',
                            fontWeight: '700',
                            color: '#1F2937',
                            marginBottom: '1.5rem',
                            paddingBottom: '0.75rem',
                            borderBottom: '2px solid #ff6b35'
                        }}>
                            Upcoming Auctions
                        </h2>
                        <div style={{ 
                            display: 'flex', 
                            flexDirection: 'column',
                            gap: '1.5rem',
                            alignItems: 'center'
                        }}>
                            <AuctionCard 
                                title="Limited Edition Patek Philippe"
                                description="Exclusive limited edition timepiece with original documentation and certificate of authenticity."
                                currentBid="$25,000"
                                timeLeft="5d 12h 30m"
                                totalBids="0"
                                bidIncrement="$1,000"
                                imageUrl="https://images.unsplash.com/photo-1622434641406-a158123450f9?w=400&h=300&fit=crop"
                                isLive={false}
                                isBidInitiated={false}
                            />
                            
                            <AuctionCard 
                                title="Vintage Omega Seamaster 300"
                                description="Rare dive watch from the 1950s in remarkable condition. Perfect for serious collectors."
                                currentBid="$15,000"
                                timeLeft="3d 8h 45m"
                                totalBids="0"
                                bidIncrement="$750"
                                imageUrl="https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop"
                                isLive={false}
                                isBidInitiated={false}
                            />
                            
                            <AuctionCard 
                                title="Audemars Piguet Royal Oak"
                                description="Iconic timepiece from the 1990s with original box and warranty papers. Highly sought after."
                                currentBid="$30,000"
                                timeLeft="7d 2h 15m"
                                totalBids="0"
                                bidIncrement="$1,500"
                                imageUrl="https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=400&h=300&fit=crop"
                                isLive={false}
                                isBidInitiated={false}
                            />
                        </div>
                    </div>

                    {/* Featured Auctions Section */}
                    <div style={{ marginBottom: '3rem' }}>
                        <h2 style={{
                            fontSize: '1.75rem',
                            fontWeight: '700',
                            color: '#1F2937',
                            marginBottom: '1.5rem',
                            paddingBottom: '0.75rem',
                            borderBottom: '2px solid #ff6b35'
                        }}>
                            Featured Auctions
                        </h2>
                        <div style={{ 
                            display: 'flex', 
                            flexDirection: 'column',
                            gap: '1.5rem',
                            alignItems: 'center'
                        }}>
                            <AuctionCard 
                                title="Rare Vintage Rolex Daytona"
                                description="Extremely rare Paul Newman Daytona from 1969. One of the most coveted watches in horological history."
                                currentBid="$50,000"
                                timeLeft="1d 6h 20m"
                                totalBids="156"
                                bidIncrement="$2,500"
                                imageUrl="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=300&fit=crop"
                                isLive={true}
                                isBidInitiated={true}
                            />
                            
                            <AuctionCard 
                                title="Jaeger-LeCoultre Reverso Tribute"
                                description="Elegant reversible watch with exquisite craftsmanship. A masterpiece of Swiss watchmaking."
                                currentBid="$18,500"
                                timeLeft="4h 45m 30s"
                                totalBids="89"
                                bidIncrement="$1,000"
                                imageUrl="https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=400&h=300&fit=crop"
                                isLive={true}
                                isBidInitiated={false}
                            />
                            
                            <AuctionCard 
                                title="Vintage Tudor Submariner"
                                description="Classic dive watch from the 1970s with original bracelet and bezel. Excellent investment piece."
                                currentBid="$9,750"
                                timeLeft="6h 30m 15s"
                                totalBids="42"
                                bidIncrement="$500"
                                imageUrl="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop"
                                isLive={true}
                                isBidInitiated={true}
                            />
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'all-products' && (
                <div style={{ 
                    padding: '2rem 1rem',
                    // maxWidth: '1400px',
                    margin: '0 auto',
                    // width: '100%'
                }}>
                    <div className="marketplace-products-grid">
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
                        <ProductCard 
                            productName="Nike Air Max"
                            price="$79.99"
                            size="EU41"
                            color="RED/BLACK"
                            description="Premium athletic shoe with air cushioning technology."
                        />
                        <ProductCard 
                            productName="Reebok Classic"
                            price="$54.99"
                            size="EU38"
                            color="NAVY/WHITE"
                            description="Classic retro style with modern comfort features."
                        />
                        <ProductCard 
                            productName="New Balance 574"
                            price="$64.99"
                            size="EU42"
                            color="GRAY/BLUE"
                            description="Timeless design with superior arch support."
                        />
                        <ProductCard 
                            productName="Vans Old Skool"
                            price="$45.99"
                            size="EU40"
                            color="BLACK/WHITE"
                            description="Iconic skate shoe with durable construction."
                        />
                        <ProductCard 
                            productName="Converse Chuck Taylor"
                            price="$50.99"
                            size="EU39"
                            color="WHITE/BLACK"
                            description="Classic canvas sneaker, perfect for everyday wear."
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default MarketPlace;

