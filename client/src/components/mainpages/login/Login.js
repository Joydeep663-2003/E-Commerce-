import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  MdOutlineMail,
  MdOutlineLock,
  MdOutlineVisibility,
  MdOutlineVisibilityOff
} from 'react-icons/md';
import { GlobalState } from '../../../GlobalState';
import './login.css';

const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const state = useContext(GlobalState);
  const [, setToken] = state.token;
  const [, setIsLogged] = state.isLogged;
  const [, setUserData] = state.user;

  const navigate = useNavigate();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setError('');
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const API_URL = process.env.REACT_APP_API_URL || '';
      if (API_URL) {
        const res = await axios.post(`${API_URL}/api/user/login`, user, {
          withCredentials: true,
        });

        localStorage.setItem('firstLogin', true);
        localStorage.setItem('token', res.data.accessToken);
        setToken(res.data.accessToken);
        setIsLogged(true);
        if (res.data.user) setUserData(res.data.user);
      } else {
        // Fallback for instant client-side demo authentication
        localStorage.setItem('firstLogin', true);
        localStorage.setItem('token', 'demo_token_12345');
        setToken('demo_token_12345');
        setIsLogged(true);
        setUserData({ name: 'Joydeep Customer', email: user.email, role: 0 });
      }

      navigate('/');
    } catch (err) {
      setError(err?.response?.data?.msg || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoUser = () => {
    setUser({ email: 'joydeep@example.com', password: 'password123' });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Sign in to your account to continue shopping</p>
        </div>

        {error && <div className="badge badge-warning" style={{ width: '100%', padding: '10px', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={loginSubmit} className="auth-form">
          <div className="input-group">
            <label><MdOutlineMail size={16} /> Email Address</label>
            <div className="input-wrapper">
              <MdOutlineMail size={18} className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                value={user.email}
                onChange={onChangeInput}
              />
            </div>
          </div>

          <div className="input-group">
            <label><MdOutlineLock size={16} /> Password</label>
            <div className="input-wrapper">
              <MdOutlineLock size={18} className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
                required
                value={user.password}
                onChange={onChangeInput}
              />
              <span
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <MdOutlineVisibilityOff size={18} /> : <MdOutlineVisibility size={18} />}
              </span>
            </div>
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" defaultChecked /> Remember me
            </label>
            <Link to="#" className="forgot-link">Forgot password?</Link>
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>

          <button type="button" className="demo-login-btn" onClick={fillDemoUser}>
            ⚡ Auto-Fill Quick Demo Credentials
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account? <Link to="/register">Create Account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
