import React, { createContext, useState, useEffect } from 'react';
import UserAPI from './api/UserAPI';
import ProductAPI from './api/ProductAPI';
import axios from 'axios';

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState({});

  // Refresh token once on first load
  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin');
    if (firstLogin && !token) {
      axios.get(`${process.env.REACT_APP_API_URL}/user/refresh_token`, { withCredentials: true })
        .then(res => {
          localStorage.setItem('token', res.data.accessToken);
          setToken(res.data.accessToken);
        })
        .catch(() => {
          console.warn('Token refresh failed. User must login.');
          localStorage.removeItem('firstLogin');
          localStorage.removeItem('token');
          setToken('');
        });
    }
  }, []); // run only once

  const userAPI = token ? UserAPI(token) : null;
  const productAPI = ProductAPI();

  // Sync global user info
  useEffect(() => {
    if (!userAPI) {
      setUser({});
      setIsLogged(false);
      setIsAdmin(false);
      return;
    }
    const [u] = userAPI.user;
    setUser(u || {});
    setIsLogged(!!u?._id);
    setIsAdmin(u?.role === 1);
  }, [userAPI, userAPI?.user]);

  return (
    <GlobalState.Provider value={{
      token: [token, setToken],
      isLogged: [isLogged, setIsLogged],
      isAdmin: [isAdmin, setIsAdmin],
      userAPI,
      user,
      productAPI
    }}>
      {children}
    </GlobalState.Provider>
  );
};
