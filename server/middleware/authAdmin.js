const authAdmin = (req, res, next) => {
  try {
    if (req.user.role !== 1) {
      return res.status(403).json({ msg: 'Admin resources access denied' });
    }
    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = authAdmin;
