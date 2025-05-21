const express = require ('express');
const { createOrder } = require('../controllers/orderController');
const app= express()

const router= express.Router();


router.route('/order').post(createOrder)

module.exports= router;