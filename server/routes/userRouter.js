const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

// Authentication routes
router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.get('/logout', userCtrl.logout);
router.get('/refresh_token', userCtrl.refreshtoken);
router.get('/infor', auth, userCtrl.getUser);

// Admin route example (optional)
router.patch('/user/:id/role', auth, authAdmin, userCtrl.updateUserRole);

module.exports = router;
