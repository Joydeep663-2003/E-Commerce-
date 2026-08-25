import React, { useContext, useEffect, useState } from 'react';
import {
  MdOutlineMenu,
  MdClose,
  MdOutlineShoppingBag,
  MdOutlineLightMode,
  MdOutlineDarkMode,
  MdOutlineLocalShipping,
  MdOutlinePerson,
  MdOutlineLogout,
  MdOutlineSearch
} from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GlobalState } from '../../GlobalState';
import { ThemeContext } from '../../context/ThemeContext';
import './header.css';

const Header = () => {
  const state = useContext(GlobalState);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [isLogged] = state.isLogged;
  const [isAdmin] = state.isAdmin;
  const [cart] = state.cart;
  const [user] = state.user;
  const [search, setSearch] = state.productAPI.search;

  const [menuOpen, setMenuOpen] = useState(false);
  const [bump, setBump] = useState(false);
  const [localSearch, setLocalSearch] = useState(search || '');

  // Trigger bump animation when cart updates
  useEffect(() => {
    if (cart.length === 0) return;
    setBump(true);
    const timer = setTimeout(() => setBump(false), 200);
    return () => clearTimeout(timer);
  }, [cart]);

  const logoutUser = async () => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || '';
      if (API_URL) {
        await axios.get(`${API_URL}/api/user/logout`, { withCredentials: true });
      }
    } catch (err) {
      console.log('Logout cleanup:', err.message);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('firstLogin');
      window.location.href = '/login';
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(localSearch);
    navigate('/');
  };

  const totalQuantity = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const userName = user?.name ? user.name.split(' ')[0] : 'User';

  return (
    <header className="navbar">
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <MdClose size={28} /> : <MdOutlineMenu size={28} />}
      </div>

      <div className="brand-logo">
        <Link to="/">
          <span className="logo-icon">🛍️</span>
          <span className="logo-text">India<span className="logo-highlight">Mart</span></span>
        </Link>
      </div>

      {/* Global Search Bar */}
      <form className="nav-search-form" onSubmit={handleSearchSubmit}>
        <MdOutlineSearch size={20} className="search-icon" />
        <input
          type="text"
          placeholder="Search 100+ items, categories..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
      </form>

      <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <li>
          <Link to="/" onClick={() => setMenuOpen(false)}>Shop</Link>
        </li>
        
        {isLogged ? (
          <>
            <li>
              <Link to="/orders" onClick={() => setMenuOpen(false)} className="nav-item-icon">
                <MdOutlineLocalShipping size={18} /> Track Orders
              </Link>
            </li>
            <li className="user-profile-badge">
              <span className="user-avatar"><MdOutlinePerson size={18} /></span>
              <span className="user-name">Hi, {userName}</span>
            </li>
            <li>
              <button onClick={logoutUser} className="logout-btn" title="Logout">
                <MdOutlineLogout size={18} /> Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login" className="login-nav-btn" onClick={() => setMenuOpen(false)}>
              Sign In
            </Link>
          </li>
        )}
      </ul>

      <div className="nav-actions">
        {/* Dark/Light Mode Switch */}
        <button
          onClick={toggleTheme}
          className="theme-toggle-btn"
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
          {theme === 'light' ? <MdOutlineDarkMode size={22} /> : <MdOutlineLightMode size={22} />}
        </button>

        {/* Cart Icon */}
        {!isAdmin && (
          <Link to="/cart" className="cart-badge-btn" title="View Cart">
            <MdOutlineShoppingBag size={24} />
            <span className={`cart-count ${bump ? 'bump' : ''}`}>{totalQuantity}</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
