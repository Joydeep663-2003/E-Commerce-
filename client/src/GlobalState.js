import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import ProductAPI from './api/ProductAPI';
import UserAPI from './api/UserAPI';

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(() => {
    const localCart = localStorage.getItem('guestCart');
    return localCart ? JSON.parse(localCart) : [];
  });
  const [orders, setOrders] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  const API_URL = process.env.REACT_APP_API_URL || '';

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin');
    if (firstLogin && !token && API_URL) {
      axios
        .get(`${API_URL}/api/user/refresh_token`, {
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
  }, [token, API_URL]);

  useEffect(() => {
    if (!token) {
      setUser(null);
      setIsLogged(false);
      setIsAdmin(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${API_URL || ''}/api/user/infor`,
          {
            headers: { Authorization: token.startsWith('Bearer') ? token : `Bearer ${token}` },
            withCredentials: true,
          }
        );

        setUser(res.data);
        if (res.data.cart && res.data.cart.length > 0) {
          setCart(res.data.cart);
        }
        setIsLogged(true);
        setIsAdmin(res.data.role === 1);

        // Fetch user orders if logged in
        fetchOrders(token);
      } catch (err) {
        console.log('User info sync note:', err.message);
      }
    };

    fetchUser();
  }, [token, API_URL]);

  const fetchOrders = async (authToken) => {
    try {
      const res = await axios.get(`${API_URL}/api/orders`, {
        headers: { Authorization: authToken.startsWith('Bearer') ? authToken : `Bearer ${authToken}` },
        withCredentials: true
      });
      setOrders(res.data);
    } catch (err) {
      console.log('Orders fetch note:', err.message);
    }
  };

  const addToCart = async (product) => {
    const exists = cart.find((item) => item._id === product._id || item.product_id === product.product_id);
    let newCart;

    if (exists) {
      newCart = cart.map((item) =>
        item._id === product._id || item.product_id === product.product_id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(newCart);
    localStorage.setItem('guestCart', JSON.stringify(newCart));
    showToast(`🛒 "${product.title}" added to cart!`);

    if (isLogged && token && API_URL) {
      try {
        await axios.patch(
          `${API_URL}/api/user/addcart`,
          { cart: newCart },
          {
            headers: { Authorization: token.startsWith('Bearer') ? token : `Bearer ${token}` },
            withCredentials: true,
          }
        );
      } catch (err) {
        console.log('Sync cart note:', err.message);
      }
    }
  };

  const state = {
    token: [token, setToken],
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    user: [user, setUser],
    cart: [cart, setCart],
    orders: [orders, setOrders],
    addToCart,
    showToast,
    productAPI: ProductAPI(),
    userAPI: UserAPI(token)
  };

  return (
    <GlobalState.Provider value={state}>
      {children}
      {toastMessage && (
        <div className="toast-container">
          <div className="toast">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </GlobalState.Provider>
  );
};
