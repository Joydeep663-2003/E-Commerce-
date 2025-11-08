import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);

  // Refresh token on first load
  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin');
    if (firstLogin && !token) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/user/refresh_token`, { withCredentials: true })
        .then(res => {
          localStorage.setItem('token', res.data.accessToken);
          setToken(res.data.accessToken);
        })
        .catch(() => {
          localStorage.removeItem('firstLogin');
          localStorage.removeItem('token');
          setToken('');
        });
    }
  }, []);

  // Fetch user info and cart whenever token changes
  useEffect(() => {
    if (!token) {
      setUser({});
      setCart([]);
      setIsLogged(false);
      setIsAdmin(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/infor`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        setUser(res.data);
        setCart(res.data.cart || []);
        setIsLogged(true);
        setIsAdmin(res.data.role === 1);
      } catch (err) {
        console.error('Failed to fetch user info:', err);
        setUser({});
        setCart([]);
        setIsLogged(false);
        setIsAdmin(false);
      }
    };

    fetchUser();
  }, [token]);

  // Add to cart
  const addToCart = async (product) => {
    if (!isLogged) return alert('Please login first.');

    // Check if product exists in cart
    const existing = cart.find(item => item._id === product._id);
    const newCart = existing
      ? cart.map(item => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...cart, { ...product, quantity: 1 }];

    setCart(newCart);

    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/user/addcart`,
        { cart: newCart },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
    } catch (err) {
      console.error('Failed to update cart on server:', err);
    }
  };

  // Remove from cart
  const removeFromCart = async (id) => {
    const newCart = cart.filter(item => item._id !== id);
    setCart(newCart);

    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/user/addcart`,
        { cart: newCart },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
    } catch (err) {
      console.error('Failed to remove item from server:', err);
    }
  };

  return (
    <GlobalState.Provider
      value={{
        token: [token, setToken],
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        user,
        cart: [cart, setCart],
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </GlobalState.Provider>
  );
};
