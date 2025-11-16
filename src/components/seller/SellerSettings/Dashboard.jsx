import React from 'react';
import '../../../assets/css/common.css';

const Dashboard = () => {
  // Demo data - replace with actual API data
  const stats = [
    { label: 'Total Products', value: '124', icon: '📦', color: '#3B82F6', change: '+12%' },
    { label: 'Active Auctions', value: '18', icon: '🔨', color: '#10B981', change: '+5%' },
    { label: 'Total Sales', value: '$45,230', icon: '💰', color: '#F59E0B', change: '+23%' },
    { label: 'Pending Orders', value: '8', icon: '📋', color: '#EF4444', change: '-3%' }
  ];

  const recentActivity = [
    { id: 1, type: 'New Order', description: 'Order #12345 - Nike Air Max', time: '2 hours ago', amount: '$79.99' },
    { id: 2, type: 'Auction Bid', description: 'Vintage Rolex - New bid received', time: '5 hours ago', amount: '$12,500' },
    { id: 3, type: 'Product Added', description: 'Adidas Running Shoe', time: '1 day ago', amount: '' },
    { id: 4, type: 'Order Completed', description: 'Order #12340 - Puma Sports Shoe', time: '2 days ago', amount: '$49.99' },
    { id: 5, type: 'Auction Ended', description: 'Antique Omega Speedmaster', time: '3 days ago', amount: '$8,750' }
  ];

  return (
    <div className="seller-dashboard">
      <h2 className="seller-section-title">Dashboard</h2>
      <div className="seller-dashboard-content">
        {/* Stats Cards Grid */}
        <div className="dashboard-stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="dashboard-stat-card">
              <div className="dashboard-stat-icon" style={{ background: `${stat.color}15`, color: stat.color }}>
                <span style={{ fontSize: '24px' }}>{stat.icon}</span>
              </div>
              <div className="dashboard-stat-info">
                <p className="dashboard-stat-label">{stat.label}</p>
                <h3 className="dashboard-stat-value">{stat.value}</h3>
                <span className={`dashboard-stat-change ${stat.change.startsWith('+') ? 'positive' : 'negative'}`}>
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="dashboard-charts-section">
          <div className="dashboard-chart-card">
            <h3 className="dashboard-chart-title">Sales Overview</h3>
            <div className="dashboard-chart-placeholder">
              <div className="dashboard-chart-bars">
                {[65, 80, 45, 90, 70, 85, 60].map((height, index) => (
                  <div key={index} className="dashboard-chart-bar" style={{ height: `${height}%` }}></div>
                ))}
              </div>
              <div className="dashboard-chart-labels">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>
          </div>

          <div className="dashboard-chart-card">
            <h3 className="dashboard-chart-title">Top Products</h3>
            <div className="dashboard-top-products">
              {[
                { name: 'Nike Air Max', sales: 45, revenue: '$3,599.55' },
                { name: 'Adidas Running Shoe', sales: 32, revenue: '$1,919.68' },
                { name: 'Puma Sports Shoe', sales: 28, revenue: '$1,399.72' },
                { name: 'Reebok Classic', sales: 22, revenue: '$1,209.78' }
              ].map((product, index) => (
                <div key={index} className="dashboard-product-item">
                  <div className="dashboard-product-info">
                    <span className="dashboard-product-rank">#{index + 1}</span>
                    <span className="dashboard-product-name">{product.name}</span>
                  </div>
                  <div className="dashboard-product-stats">
                    <span className="dashboard-product-sales">{product.sales} sales</span>
                    <span className="dashboard-product-revenue">{product.revenue}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="dashboard-activity-section">
          <div className="dashboard-activity-header">
            <h3 className="dashboard-activity-title">Recent Activity</h3>
            <button className="dashboard-view-all-btn">View All</button>
          </div>
          <div className="dashboard-activity-list">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="dashboard-activity-item">
                <div className="dashboard-activity-icon">
                  {activity.type === 'New Order' && '🛒'}
                  {activity.type === 'Auction Bid' && '🔨'}
                  {activity.type === 'Product Added' && '➕'}
                  {activity.type === 'Order Completed' && '✅'}
                  {activity.type === 'Auction Ended' && '🏁'}
                </div>
                <div className="dashboard-activity-content">
                  <div className="dashboard-activity-main">
                    <span className="dashboard-activity-type">{activity.type}</span>
                    <span className="dashboard-activity-description">{activity.description}</span>
                  </div>
                  <div className="dashboard-activity-meta">
                    <span className="dashboard-activity-time">{activity.time}</span>
                    {activity.amount && (
                      <span className="dashboard-activity-amount">{activity.amount}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

