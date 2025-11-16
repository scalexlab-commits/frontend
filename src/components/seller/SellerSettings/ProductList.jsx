import React, { useState } from 'react';

const ProductList = () => {
  const [itemsPerPage, setItemsPerPage] = useState(11);
  const [currentPage, setCurrentPage] = useState(1);

  // Sample product data
  const products = [
    { id: 1, name: 'Mens T-shirt', category: 'Clothes', status: 'out-of-stock', stock: 449, price: 172.00, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop' },
    { id: 2, name: 'Leather Hand Bag', category: 'Bag', status: 'in-stock', stock: 223, price: 112.00, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop' },
    { id: 3, name: 'Pure Leather Male Shoe', category: 'Shoe', status: 'coming-soon', stock: 98, price: 152.00, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop' },
    { id: 4, name: 'Stylish Shoe', category: 'Shoe', status: 'out-of-stock', stock: 74, price: 195.00, image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=100&h=100&fit=crop' },
    { id: 5, name: 'Nike Airforce X7', category: 'Shoe', status: 'in-stock', stock: 243, price: 170.00, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop' },
    { id: 6, name: 'Man Watch', category: 'Watch', status: 'coming-soon', stock: 87, price: 142.00, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop' },
    { id: 7, name: 'Casual Sunglass', category: 'Sunglass', status: 'out-of-stock', stock: 12, price: 120.00, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=100&h=100&fit=crop' },
    { id: 8, name: 'Leather Hand Bag', category: 'Bag', status: 'in-stock', stock: 92, price: 112.00, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop' },
    { id: 9, name: 'Mens T-shirt', category: 'Clothes', status: 'in-stock', stock: 23, price: 172.00, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop' },
    { id: 10, name: 'Nike Airforce X7', category: 'Shoe', status: 'out-of-stock', stock: 427, price: 170.00, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop' },
    { id: 11, name: 'Man Watch', category: 'Watch', status: 'in-stock', stock: 123, price: 142.00, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop' },
  ];

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const handleEdit = (id) => {
    console.log('Edit product:', id);
  };

  const handleDelete = (id) => {
    console.log('Delete product:', id);
  };

  return (
    <div className="seller-product-list">
      <h2 className="seller-section-title">Product List</h2>
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
                <path d="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Filter
            </button>
            {/* <button className="product-list-btn product-list-btn-primary">
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Add Product
            </button> */}
          </div>
        </div>

        {/* Product Table */}
        <div className="product-list-table-wrapper">
          <table className="product-list-table">
            <thead>
              <tr>
                <th className="product-list-th">
                  <input type="checkbox" className="product-list-checkbox" />
                  PRODUCT
                </th>
                <th className="product-list-th">CATEGORY</th>
                <th className="product-list-th">STATUS</th>
                <th className="product-list-th">STOCK</th>
                <th className="product-list-th">PRICE</th>
                <th className="product-list-th">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product) => (
                <tr key={product.id} className="product-list-row">
                  <td className="product-list-td product-list-td-product">
                    <input type="checkbox" className="product-list-checkbox" />
                    <img src={product.image} alt={product.name} className="product-list-image" />
                    <span className="product-list-name">{product.name}</span>
                  </td>
                  <td className="product-list-td">{product.category}</td>
                  <td className="product-list-td">
                    <span className={`product-list-status product-list-status-${product.status}`}>
                      <span className="status-dot"></span>
                      {product.status === 'in-stock' ? 'In Stock' : 
                       product.status === 'out-of-stock' ? 'Out of stock' : 
                       'Coming Soon'}
                    </span>
                  </td>
                  <td className="product-list-td">{product.stock}</td>
                  <td className="product-list-td">${product.price.toFixed(2)}</td>
                  <td className="product-list-td product-list-td-actions">
                    <button 
                      className="product-list-action-btn"
                      onClick={() => handleEdit(product.id)}
                      title="Edit"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" strokeWidth="2"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" strokeWidth="2"/>
                      </svg>
                    </button>
                    <button 
                      className="product-list-action-btn"
                      onClick={() => handleDelete(product.id)}
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

export default ProductList;

