const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

// Auth routes
router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.get('/logout', userCtrl.logout);
router.get('/refresh_token', userCtrl.refreshToken);
router.get('/infor', auth, userCtrl.getUser);

// Admin route example
router.patch('/user/:id/role', auth, authAdmin, userCtrl.updateUserRole);

// Add/update cart route
router.patch('/addcart', auth, userCtrl.addCart);

module.exports = router;
