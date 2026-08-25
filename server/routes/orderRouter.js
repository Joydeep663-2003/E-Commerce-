const router = require('express').Router();
const orderCtrl = require('../controllers/orderCtrl');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

router.route('/')
  .get(auth, orderCtrl.getOrders)
  .post(auth, orderCtrl.createOrder);

router.route('/:id')
  .get(auth, orderCtrl.getOrderById)
  .patch(auth, authAdmin, orderCtrl.updateOrderStatus);

module.exports = router;
