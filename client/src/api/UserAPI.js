import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const UserAPI = (token) => {
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/user/infor`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setUser(res.data);
        setCart(Array.isArray(res.data.cart) ? res.data.cart : []);
      } catch (err) {
        console.error('Error fetching user info:', err.response?.data?.msg || err.message);
        setUser({});
        setCart([]);
      }
    };
    fetchUser();
  }, [token]);

  const addCart = async (product) => {
    if (!product?._id) return false;
    if (!cart.every(item => item._id !== product._id)) {
      alert('This product is already in your cart.');
      return false;
    }
    const newCart = [...cart, { ...product, quantity: 1 }];
    setCart(newCart);

    try {
      await axios.patch(`${API_URL}/user/addcart`, { cart: newCart }, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      return true;
    } catch (err) {
      console.error('Failed to add to cart:', err.response?.data?.msg || err.message);
      return false;
    }
  };

  const removeFromCart = async (productId) => {
    const newCart = cart.filter(item => item._id !== productId);
    setCart(newCart);

    try {
      await axios.patch(`${API_URL}/user/addcart`, { cart: newCart }, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
    } catch (err) {
      console.error('Failed to remove from cart:', err.response?.data?.msg || err.message);
    }
  };

  return { user: [user, setUser], cart: [cart, setCart], addCart, removeFromCart };
};

export default UserAPI;
