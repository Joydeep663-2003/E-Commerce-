import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin');
    if (firstLogin && !token) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/user/refresh_token`, {
          withCredentials: true,
        })
        .then((res) => {
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
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user/infor`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        setUser(res.data);
        setCart(res.data.cart || []);
        setIsLogged(true);
        setIsAdmin(res.data.role === 1);
      } catch (err) {
        console.error('User info failed:', err);
        setUser({});
        setCart([]);
        setIsLogged(false);
        setIsAdmin(false);
      }
    };

    fetchUser();
  }, [token]);

  const addToCart = async (product) => {
    if (!isLogged) return alert('Please login first.');

    const exists = cart.find((item) => item._id === product._id);
    const newCart = exists
      ? cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...cart, { ...product, quantity: 1 }];

    setCart(newCart);

    await axios.patch(
      `${process.env.REACT_APP_API_URL}/api/user/addcart`,
      { cart: newCart },
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
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
      }}
    >
      {children}
    </GlobalState.Provider>
  );
};
