const express = require ('express');
const { createOrder, allOrders } = require('../controllers/orderController');
const app= express()

const router= express.Router();


router.route('/order').post(createOrder)
router.route('/order').get(allOrders)


module.exports= router;