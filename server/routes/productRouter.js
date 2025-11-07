const router = require('express').Router();
const productCtrl = require('../controllers/productCtrl');

// GET all products, POST a new product
router.route('/')
  .get(productCtrl.getProducts)
  .post(productCtrl.createProduct);

// GET, UPDATE, DELETE a specific product by ID
router.route('/:id')
  .get(productCtrl.getProduct)
  .put(productCtrl.updateProduct)
  .delete(productCtrl.deleteProduct);

module.exports = router;
