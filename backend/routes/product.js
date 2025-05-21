const express = require ('express');
const {getProducts,singleProduct,importProducts } = require('../controllers/productController');


const router= express.Router();

router.route('/products').get(getProducts)
router.route('/product/:id').get(singleProduct)
router.route('/importproduct').post(importProducts)



module.exports = router;