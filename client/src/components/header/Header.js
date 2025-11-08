import React, { useContext, useEffect, useState } from 'react';
import { MdOutlineMenu, MdClose, MdOutlineAddShoppingCart } from "react-icons/md";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { GlobalState } from '../../GlobalState';
import './header.css';

const Header = () => {
  const state = useContext(GlobalState);

  const [isLogged] = state.isLogged;
  const [isAdmin] = state.isAdmin;
  const [cart] = state.cart;
  const token = state.token[0];

  const [bump, setBump] = useState(false);

  // Trigger bump animation when cart changes
  useEffect(() => {
    if (cart.length === 0) return;
    setBump(true);
    const timer = setTimeout(() => setBump(false), 200);
    return () => clearTimeout(timer);
  }, [cart]);

  const logoutUser = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_API_URL}/user/logout`, { withCredentials: true });
      localStorage.clear();
      window.location.href = '/'; // redirect after logout
    } catch (err) {
      alert(err.response?.data?.msg || "Logout failed");
    }
  };

  const adminRouter = () => (
    <>
      <li><Link to='/create_product'>Create Product</Link></li>
      <li><Link to='/category'>Categories</Link></li>
    </>
  );

  const loggedRouter = () => (
    <>
      <li><Link to='/history'>History</Link></li>
      <li><Link to='/' onClick={logoutUser}>Logout</Link></li>
    </>
  );

  // Total quantity in cart
  const totalQuantity = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <header>
      <div className='menu'>
        <MdOutlineMenu size={30} />
      </div>

      <div className='logo'>
        <h1><Link to="/">{isAdmin ? 'Admin' : 'Shopping'}</Link></h1>
      </div>

      <ul>
        <li><Link to="/">{isAdmin ? 'Products' : 'Shop'}</Link></li>
        {isAdmin && adminRouter()}
        {isLogged ? loggedRouter() : <li><Link to="/login">Login or Register</Link></li>}
        <li><MdClose size={30} className='menu' /></li>
      </ul>

      {!isAdmin && (
        <div className='cart-icon'>
          <span className={bump ? 'bump' : ''}>{totalQuantity}</span>
          <Link to='/cart'><MdOutlineAddShoppingCart size={30} /></Link>
        </div>
      )}
    </header>
  );
};

export default Header;
