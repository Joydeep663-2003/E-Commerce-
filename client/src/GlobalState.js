import React, { createContext, useState, useEffect } from 'react';
import UserAPI from './api/UserAPI';
import ProductAPI from './api/ProductAPI';
import axios from 'axios';

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin');
    if (firstLogin) {
      const getToken = async () => {
        try {
          // Get new access token
          const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/refresh_token`, {
            withCredentials: true,
          });
          setToken(res.data.accesstoken);

          // Get user info
          const userRes = await axios.get(`${process.env.REACT_APP_API_URL}/user/infor`, {
            headers: { Authorization: `Bearer ${res.data.accesstoken}` },
          });

          setIsLogged(true);
          setIsAdmin(userRes.data.role === 1);
        } catch (err) {
          console.error('Token refresh failed:', err.response?.data?.msg || err.message);
          localStorage.removeItem('firstLogin');
          setIsLogged(false);
          setIsAdmin(false);
        }
      };
      getToken();
    }
  }, []);

  const userAPI = UserAPI(token);
  const productAPI = ProductAPI();

  const state = {
    token: [token, setToken],
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    userAPI,
    productAPI,
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
