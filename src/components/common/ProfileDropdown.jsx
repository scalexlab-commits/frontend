import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { get, post, removeAuthToken } from './apiProvider';

const ProfileDropdown = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('authToken');
    const [showDropdown, setShowDropdown] = useState(false);
    const [userData, setUserData] = useState({ name: '', email: '' });
    const dropdownRef = useRef(null);

    // Fetch user data
    useEffect(() => {
        if (token) {
            fetchUserData();
        }
    }, [token]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const fetchUserData = async () => {
        try {
            // Try to fetch seller data first (works for both sellers and regular users)
            const response = await get('/api/seller');
            if (response.success || response) {
                const sellerDetails = response.data?.sellerDetaisl || response.data?.sellerDetails || response.sellerDetaisl || response.sellerDetails;
                if (sellerDetails) {
                    setUserData({
                        name: sellerDetails.full_name || sellerDetails.name || 'User',
                        email: sellerDetails.email || ''
                    });
                } else {
                    // Fallback to default
                    setUserData({ name: 'User', email: '' });
                }
            }
        } catch (err) {
            console.error('Error fetching user data:', err);
            setUserData({ name: 'User', email: '' });
        }
    };

    const handleLogout = async () => {
        try {
            const authToken = localStorage.getItem('authToken');
            if (authToken) {
                await post('/api/logout', { token: authToken });
            }
        } catch (err) {
            console.error('Error during logout:', err);
        } finally {
            // Clear local storage and redirect regardless of API call result
            localStorage.removeItem('authToken');
            localStorage.removeItem('isSeller');
            localStorage.removeItem('isSellerType');
            removeAuthToken();
            setShowDropdown(false);
            navigate('/login');
        }
    };

    if (!token) {
        return null;
    }

    return (
        <div className="profile-dropdown-container" ref={dropdownRef}>
            <div 
                className="profile-trigger" 
                onClick={() => setShowDropdown(!showDropdown)}
            >
                <div className="profile-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z" fill="currentColor"/>
                        <path d="M10 12C5.58172 12 2 14.6863 2 18V20H18V18C18 14.6863 14.4183 12 10 12Z" fill="currentColor"/>
                    </svg>
                </div>
                <span className="profile-text">Profile</span>
                <svg 
                    className={`dropdown-arrow ${showDropdown ? 'open' : ''}`}
                    width="12" 
                    height="12" 
                    viewBox="0 0 12 12" 
                    fill="none"
                >
                    <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            
            {showDropdown && (
                <div className="profile-dropdown">
                    <Link to="/profile" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z" fill="currentColor"/>
                            <path d="M10 12C5.58172 12 2 14.6863 2 18V20H18V18C18 14.6863 14.4183 12 10 12Z" fill="currentColor"/>
                        </svg>
                        <span>Profile</span>
                    </Link>
                    <Link to="/profile/edit" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M11.05 3.00002L4.35 9.70002C4.15 9.90002 3.95 10.3 3.9 10.55L3.55 13.55C3.45 14.3 4.05 14.9 4.8 14.8L7.8 14.45C8.05 14.4 8.45 14.2 8.65 14L15.35 7.30002C16.3 6.35002 16.75 5.15002 15.35 3.75002C13.95 2.35002 12.75 2.80002 11.8 3.75002L11.05 3.00002Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Edit Profile</span>
                    </Link>
                    <Link to="/wallet" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M17.5 6.66667H2.5C1.39543 6.66667 0.5 7.5621 0.5 8.66667V16.3333C0.5 17.4379 1.39543 18.3333 2.5 18.3333H17.5C18.6046 18.3333 19.5 17.4379 19.5 16.3333V8.66667C19.5 7.5621 18.6046 6.66667 17.5 6.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M0.5 10H19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M13.3333 6.66667V4.33333C13.3333 2.49238 11.8409 1 10 1H4.33333C2.49238 1 1 2.49238 1 4.33333V6.66667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Wallet</span>
                    </Link>                   
                    <Link to="/help" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10 13.3333V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10 6.66667H10.0083" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Customer Support</span>
                    </Link>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item logout-item" onClick={handleLogout}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M7.5 17.5H4.16667C3.24619 17.5 2.5 16.7538 2.5 15.8333V4.16667C2.5 3.24619 3.24619 2.5 4.16667 2.5H7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M13.3333 14.1667L17.5 10L13.3333 5.83333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M17.5 10H7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Logout</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;

