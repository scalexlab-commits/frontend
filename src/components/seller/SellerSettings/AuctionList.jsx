import React, { useState } from 'react';

const AuctionList = () => {
  const [itemsPerPage, setItemsPerPage] = useState(11);
  const [currentPage, setCurrentPage] = useState(1);

  // Sample auction data
  const auctions = [
    { id: 1, name: 'Vintage Rolex Submariner', category: 'Watch', status: 'live', totalBids: 47, currentBid: 12500.00, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop' },
    { id: 2, name: 'Antique Omega Speedmaster', category: 'Watch', status: 'live', totalBids: 23, currentBid: 8750.00, image: 'https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=100&h=100&fit=crop' },
    { id: 3, name: 'Vintage Cartier Tank', category: 'Watch', status: 'upcoming', totalBids: 0, currentBid: 6200.00, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=100&h=100&fit=crop' },
    { id: 4, name: 'Limited Edition Patek Philippe', category: 'Watch', status: 'upcoming', totalBids: 0, currentBid: 25000.00, image: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?w=100&h=100&fit=crop' },
    { id: 5, name: 'Rare Vintage Rolex Daytona', category: 'Watch', status: 'live', totalBids: 156, currentBid: 50000.00, image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=100&h=100&fit=crop' },
    { id: 6, name: 'Jaeger-LeCoultre Reverso', category: 'Watch', status: 'live', totalBids: 89, currentBid: 18500.00, image: 'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=100&h=100&fit=crop' },
    { id: 7, name: 'Vintage Tudor Submariner', category: 'Watch', status: 'ended', totalBids: 42, currentBid: 9750.00, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop' },
    { id: 8, name: 'Omega Seamaster 300', category: 'Watch', status: 'upcoming', totalBids: 0, currentBid: 15000.00, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=100&h=100&fit=crop' },
    { id: 9, name: 'Audemars Piguet Royal Oak', category: 'Watch', status: 'upcoming', totalBids: 0, currentBid: 30000.00, image: 'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=100&h=100&fit=crop' },
    { id: 10, name: 'Vintage Rolex GMT', category: 'Watch', status: 'ended', totalBids: 78, currentBid: 22000.00, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop' },
    { id: 11, name: 'Breitling Navitimer', category: 'Watch', status: 'live', totalBids: 34, currentBid: 14200.00, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop' },
  ];

  const totalPages = Math.ceil(auctions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAuctions = auctions.slice(startIndex, endIndex);

  const handleEdit = (id) => {
    console.log('Edit auction:', id);
  };

  const handleDelete = (id) => {
    console.log('Delete auction:', id);
  };

  return (
    <div className="seller-product-list">
      <h2 className="seller-section-title">Auction List</h2>
      <div className="seller-product-list-content">
        {/* Header Section - Search and Actions */}
        <div className="product-list-header">
          <div className="product-list-search">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8" strokeWidth="2"/>
              <path d="m21 21-4.35-4.35" strokeWidth="2"/>
            </svg>
            <input type="text" placeholder="Search..." className="product-list-search-input" />
          </div>
          <div className="product-list-actions">
            <button className="product-list-btn product-list-btn-secondary">
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M3 6h18M7 12h10M11 18h6" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Sort
            </button>
            <button className="product-list-btn product-list-btn-secondary">
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Filter
            </button>
            {/* <button className="product-list-btn product-list-btn-primary">
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Add Auction
            </button> */}
          </div>
        </div>

        {/* Auction Table */}
        <div className="product-list-table-wrapper">
          <table className="product-list-table">
            <thead>
              <tr>
                <th className="product-list-th">
                  <input type="checkbox" className="product-list-checkbox" />
                  AUCTION
                </th>
                <th className="product-list-th">CATEGORY</th>
                <th className="product-list-th">STATUS</th>
                <th className="product-list-th">TOTAL BIDS</th>
                <th className="product-list-th">CURRENT BID</th>
                <th className="product-list-th">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {currentAuctions.map((auction) => (
                <tr key={auction.id} className="product-list-row">
                  <td className="product-list-td product-list-td-product">
                    <input type="checkbox" className="product-list-checkbox" />
                    <img src={auction.image} alt={auction.name} className="product-list-image" />
                    <span className="product-list-name">{auction.name}</span>
                  </td>
                  <td className="product-list-td">{auction.category}</td>
                  <td className="product-list-td">
                    <span className={`product-list-status product-list-status-${auction.status}`}>
                      <span className="status-dot"></span>
                      {auction.status === 'live' ? 'Live' : 
                       auction.status === 'ended' ? 'Ended' : 
                       'Upcoming'}
                    </span>
                  </td>
                  <td className="product-list-td">{auction.totalBids}</td>
                  <td className="product-list-td">${auction.currentBid.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td className="product-list-td product-list-td-actions">
                    <button 
                      className="product-list-action-btn"
                      onClick={() => handleEdit(auction.id)}
                      title="Edit"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" strokeWidth="2"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" strokeWidth="2"/>
                      </svg>
                    </button>
                    <button 
                      className="product-list-action-btn"
                      onClick={() => handleDelete(auction.id)}
                      title="Delete"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeWidth="2"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="product-list-pagination">
          <div className="product-list-pagination-left">
            <span>Show</span>
            <select 
              className="product-list-per-page"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value={11}>11</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span>per page</span>
          </div>
          <div className="product-list-pagination-right">
            <button 
              className="product-list-pagination-btn"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              &lt;&lt;
            </button>
            <button 
              className="product-list-pagination-btn"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                return (
                  <button
                    key={page}
                    className={`product-list-pagination-btn ${currentPage === page ? 'active' : ''}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return <span key={page} className="product-list-pagination-ellipsis">...</span>;
              }
              return null;
            })}
            <button 
              className="product-list-pagination-btn"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
            <button 
              className="product-list-pagination-btn"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              &gt;&gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionList;