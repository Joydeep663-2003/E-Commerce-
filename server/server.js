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

// ⭐ Allowed Frontend URLs (FINAL)
const allowedOrigins = [
  "http://localhost:3000",
  "https://e-commerce-xi-jade.vercel.app"   // your correct Vercel domain
];

// ⭐ CORS Setup (SIMPLE + PERFECT)
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ⭐ Serve image uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ⭐ API Routes
app.use('/api/user', require('./routes/userRouter'));
app.use('/api/products', require('./routes/productRouter'));
app.use('/api/upload', require('./routes/upload'));

// ⭐ MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ DB Error:", err.message));

// Test Route
app.get("/", (req, res) => {
  res.send("✅ Server is running from Render!");
});

// ⭐ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
