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

// Allow requests from localhost and Vercel
const allowedOrigins = [
  'http://localhost:3000', // local dev
  'https://joydeep663-2003s-projects-e-commerce.vercel.app' // Vercel frontend
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Make uploads folder publicly accessible
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/user', require('./routes/userRouter'));
app.use('/api/products', require('./routes/productRouter'));
app.use('/api/upload', require('./routes/upload')); // upload route

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ DB Error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
