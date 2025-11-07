import React, { createContext, useState, useEffect } from 'react';
import UserAPI from './api/UserAPI';
import ProductAPI from './api/ProductAPI';
import axios from 'axios';

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin');
    if (firstLogin) {
      const getToken = async () => {
        try {
          const res = await axios.get('/user/refresh_token', {
            withCredentials: true,
          });
          setToken(res.data.accesstoken);
        } catch (err) {
          console.error('Token refresh failed:', err.response?.data?.msg || err.message);
          localStorage.removeItem('firstLogin');
        }
      };
      getToken();
    }
  }, []);

  const userAPI = UserAPI(token);               // ✅ Don't use useMemo here
  const productAPI = ProductAPI();              // ✅ Also don't memoize this

  const state = {
    token: [token, setToken],
    userAPI,
    productAPI,
  };

  return (
    <GlobalState.Provider value={state}>
      {children}
    </GlobalState.Provider>
  );
};
