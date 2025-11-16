import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

const NavBar = () => {
    const location = useLocation()
    const token = localStorage.getItem('authToken');

    const showMarketNav = /^\/(market|bids|orders|profile|product|Seller-registration)(\/.*)?$/.test(location.pathname);
;
    const isSeller = JSON.parse(localStorage.getItem('isSeller'));
    return (
        <div>
            <nav className="navbar">
                <div className="nav-container">
                    <div className="nav-logo-section">
                        {/* <img src={logo} alt="Logo" className="nav-logo-image" /> */}
                        <Link to="/" className="nav-logo">
                            Auction Bharat
                        </Link>
                    </div>
                    {/* {showMarketNav ? */}
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
                        </div>
                         {/* : null} */}

                    {!token ?
                        <div className="nav-menu">
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/registration" className="nav-link">Register</Link>
                        </div> :
                        <div className="nav-menu">
                            <Link to="" className="nav-link">Profile</Link>
                            {isSeller ? <Link to="/SellerSettings" className='Seller' >Seller Settings</Link> : <Link to="Seller-registration" className='Seller'>Become Seller</Link>}

                            {/* <Link to="/registration" className="nav-link">Register</Link> */}
                        </div>
                    }

                </div>
            </nav>
        </div>
    )
}

export default NavBar