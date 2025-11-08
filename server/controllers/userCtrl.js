const Users = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userCtrl = {

  // Register
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await Users.findOne({ email });
      if (user) return res.status(400).json({ msg: 'This email already exists.' });

      if (password.length < 6)
        return res.status(400).json({ msg: 'Password must be at least 6 characters.' });

      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new Users({ name, email, password: passwordHash });
      await newUser.save();
      res.json({ msg: 'Registered successfully. Please login.' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // Login
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });
      if (!user) return res.status(400).json({ msg: 'User does not exist.' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: 'Incorrect password.' });

      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });

      res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        path: '/user/refresh_token',
        secure: true,
        sameSite: 'None',
      });

      res.json({
        accessToken,
        user: { name: user.name, email: user.email, role: user.role, cart: user.cart }
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // Logout
  logout: async (req, res) => {
    try {
      res.clearCookie('refresh_token', { path: '/user/refresh_token' });
      res.json({ msg: 'Logged out successfully.' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // Refresh token
  refreshToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refresh_token;
      if (!rf_token) return res.status(401).json({ msg: 'Please login or register.' });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(401).json({ msg: 'Invalid refresh token.' });

        const accessToken = createAccessToken({ id: user.id });
        res.json({ accessToken });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // Get user info
  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select('-password');
      if (!user) return res.status(404).json({ msg: 'User not found.' });
      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // Add to cart
  addCart: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id);
      if (!user) return res.status(404).json({ msg: 'User not found.' });

      user.cart = req.body.cart;
      await user.save();

      res.json({ msg: 'Cart updated successfully.', cart: user.cart });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // Admin: update user role
  updateUserRole: async (req, res) => {
    try {
      await Users.findByIdAndUpdate(req.params.id, { role: req.body.role });
      res.json({ msg: 'User role updated.' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
};

const createAccessToken = payload =>
  jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

const createRefreshToken = payload =>
  jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

module.exports = userCtrl;
