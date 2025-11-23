const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

// Auth
router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.get('/logout', userCtrl.logout);
router.get('/refresh_token', userCtrl.refreshToken);

// User Info
router.get('/infor', auth, userCtrl.getUser);

// Cart
router.patch('/addcart', auth, userCtrl.addCart);

// REMOVE or COMMENT OUT this line (function does NOT exist)
// router.patch('/user/:id/role', auth, authAdmin, userCtrl.updateUserRole);

module.exports = router;
