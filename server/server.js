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

// Allowed Origins (Backend hosted on Render)
const allowedOrigins = [
  "http://localhost:3000",
  "https://e-commerce-xi-jade.vercel.app",
  /\.vercel\.app$/,
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Static folder for product images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/user", require("./routes/userRouter"));
app.use("/api/products", require("./routes/productRouter"));
app.use("/api/upload", require("./routes/upload"));

// MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err.message));

app.get("/", (req, res) => {
  res.send("Server Running ✔");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));
