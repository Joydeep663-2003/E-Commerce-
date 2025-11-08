import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_URL}/user/login`, user, {
        withCredentials: true,
      });
      localStorage.setItem('firstLogin', true);
      // reload to update DataProvider
      window.location.reload();
    } catch (err) {
      alert(err?.response?.data?.msg || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={loginSubmit}>
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          value={user.email}
          onChange={onChangeInput}
        />
        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          value={user.password}
          onChange={onChangeInput}
        />
        <div className="row">
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
