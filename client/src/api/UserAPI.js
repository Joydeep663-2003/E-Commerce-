import { useState, useEffect } from 'react';
import axios from 'axios';

const UserAPI = (token) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);
  const [addresses, setAddresses] = useState([]);

  const API_URL = process.env.REACT_APP_API_URL || '';

  useEffect(() => {
    if (!token) return;

    const getUser = async () => {
      try {
        const authHeader = token.startsWith('Bearer') ? token : `Bearer ${token}`;
        const res = await axios.get(`${API_URL}/api/user/infor`, {
          headers: { Authorization: authHeader },
          withCredentials: true,
        });

        setIsLogged(true);
        setUser(res.data);
        setIsAdmin(res.data.role === 1);
        if (res.data.cart) setCart(res.data.cart);
        if (res.data.addresses) setAddresses(res.data.addresses);
      } catch (err) {
        console.log("User sync note:", err.message);
      }
    };

    getUser();
  }, [token, API_URL]);

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    user: [user, setUser],
    cart: [cart, setCart],
    history: [history, setHistory],
    addresses: [addresses, setAddresses]
  };
};

export default UserAPI;
