require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// ⭐ Allowed Frontend URLs
const allowedOrigins = [
  'http://localhost:3000',                     // Local React dev
  'https://e-commerce-joydeep.vercel.app'      // Your Vercel domain
];

// ⭐ CORS Setup (Important for login + cookies)
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// ⭐ Serve image uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ⭐ Routes
app.use('/api/user', require('./routes/userRouter'));
app.use('/api/products', require('./routes/productRouter'));
app.use('/api/upload', require('./routes/upload'));

// ⭐ MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ DB Connection Error:', err.message));

// Default Check Route
app.get('/', (req, res) => {
  res.send('✅ Server is running');
});

// ⭐ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
