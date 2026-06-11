const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/products', orderController.getProducts);
router.post('/orders', orderController.createOrder);

module.exports = router;
