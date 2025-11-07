import { useState, useEffect } from 'react';
import axios from 'axios';

const UserAPI = (token) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      if (!token) return; // ✅ check inside, not before hooks

      try {
        const res = await axios.get('/user/infor', {
          headers: { Authorization: token },
        });

        setIsLogged(true);
        setIsAdmin(res.data.role === 1);
        setUser(res.data);
        setCart(Array.isArray(res.data.cart) ? res.data.cart : []);
      } catch (err) {
        console.error('Error fetching user info:', err.response?.data?.msg || err.message);
      }
    };

    getUser();
  }, [token]);

  const addCart = async (product) => {
    if (!isLogged) return alert('Please login to continue.');
    if (!product || !product._id) return;

    const check = cart.every((item) => item._id !== product._id);
    if (check) {
      const newCart = [...cart, { ...product, quantity: 1 }];
      setCart(newCart);
      try {
        await axios.patch('/user/addcart', { cart: newCart }, {
          headers: { Authorization: token },
        });
      } catch (err) {
        console.error('Failed to update cart:', err.response?.data?.msg || err.message);
      }
    } else {
      alert('This product is already in your cart.');
    }
  };

  const removeFromCart = async (productId) => {
    const newCart = cart.filter((item) => item._id !== productId);
    setCart(newCart);
    try {
      await axios.patch('/user/addcart', { cart: newCart }, {
        headers: { Authorization: token },
      });
    } catch (err) {
      console.error('Failed to remove from cart:', err.response?.data?.msg || err.message);
    }
  };

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    user: [user, setUser],
    cart: [cart, setCart],
    addCart,
    removeFromCart,
  };
};

export default UserAPI;
