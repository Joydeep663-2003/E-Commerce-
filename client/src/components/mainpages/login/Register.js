import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  MdOutlinePerson,
  MdOutlineMail,
  MdOutlineLock,
  MdOutlineVisibility,
  MdOutlineVisibilityOff
} from 'react-icons/md';
import './login.css';

const Register = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setError('');
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const API_URL = process.env.REACT_APP_API_URL || '';
      if (API_URL) {
        await axios.post(
          `${API_URL}/api/user/register`,
          user,
          { withCredentials: true }
        );
      }
      alert('🎉 Account created successfully! Please sign in.');
      navigate('/login');
    } catch (err) {
      setError(err?.response?.data?.msg || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create Your Account</h2>
          <p>Join IndiaMart to enjoy exclusive deals and order tracking</p>
        </div>

        {error && <div className="badge badge-warning" style={{ width: '100%', padding: '10px', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={registerSubmit} className="auth-form">
          <div className="input-group">
            <label><MdOutlinePerson size={16} /> Full Name / Username</label>
            <div className="input-wrapper">
              <MdOutlinePerson size={18} className="input-icon" />
              <input
                type="text"
                name="name"
                required
                placeholder="Enter your full username"
                value={user.name}
                onChange={onChangeInput}
              />
            </div>
          </div>

          <div className="input-group">
            <label><MdOutlineMail size={16} /> Email Address</label>
            <div className="input-wrapper">
              <MdOutlineMail size={18} className="input-icon" />
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
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
                required
                placeholder="Minimum 6 characters"
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

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Creating Account...' : 'Register Account'}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
