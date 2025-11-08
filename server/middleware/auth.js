const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.cookies?.refreshtoken; // ✅ always from cookie
    if (!token) return res.status(401).json({ msg: "Authentication failed" });

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(401).json({ msg: "Invalid token" });
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = auth;
