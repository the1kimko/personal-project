// src/components/NavBar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutSuccess } from '../../redux/actions/authActions';
import './navbar.css';

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector((state) => state.auth.user); // Access user from Redux state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutSuccess()); // Dispatch logout action to clear Redux user data
    alert('You have successfully logged out.');
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Vetty
        </Link>
        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>
        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/products" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            Products
          </Link>
          <Link to="/services" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            Services
          </Link>
          <Link to="/cart" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            Cart
          </Link>
          {user ? (
            <>
              <Link to="/profile" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                Profile
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                  Admin Dashboard
                </Link>
              )}
              <button className="navbar-link logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
