const Users = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userCtrl = {

  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const user = await Users.findOne({ email });
      if (user)
        return res.status(400).json({ msg: "This email already exists." });

      if (password.length < 6)
        return res.status(400).json({ msg: "Password must be at least 6 characters." });

      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = new Users({
        name,
        email,
        password: passwordHash,
      });

      await newUser.save();

      return res.json({ msg: "Registered successfully. Please login." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email });
      if (!user)
        return res.status(400).json({ msg: "User does not exist." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Incorrect password." });

      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });

      // ⭐ FIXED COOKIE for Vercel + Render + Localhost
      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: true,          // required for vercel/https
        sameSite: "None",      // required for cross-site cookies
        path: "/api/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.json({
        msg: "Login success!",
        accessToken,
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
          cart: user.cart,
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("refresh_token", {
        path: "/api/user/refresh_token",
      });

      return res.json({ msg: "Logged out successfully." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  refreshToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refresh_token;

      if (!rf_token)
        return res.status(401).json({ msg: "Please login or register." });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
          return res.status(401).json({ msg: "Invalid refresh token." });

        const accessToken = createAccessToken({ id: user.id });
        return res.json({ accessToken });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("-password");
      if (!user)
        return res.status(404).json({ msg: "User not found." });

      return res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  addCart: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id);
      if (!user)
        return res.status(404).json({ msg: "User not found." });

      user.cart = req.body.cart;
      await user.save();

      return res.json({
        msg: "Cart updated successfully.",
        cart: user.cart,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  addAddress: async (req, res) => {
    try {
      const { fullName, phone, street, city, state, pincode, tag } = req.body;
      const user = await Users.findById(req.user.id);
      if (!user) return res.status(404).json({ msg: "User not found." });

      const newAddress = { fullName, phone, street, city, state, pincode, tag: tag || 'Home' };
      user.addresses.push(newAddress);
      await user.save();

      return res.json({ msg: "Address added successfully", addresses: user.addresses });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
};

// TOKEN GENERATORS
const createAccessToken = (payload) =>
  jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

const createRefreshToken = (payload) =>
  jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

module.exports = userCtrl;
