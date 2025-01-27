const express = require('express');
const {
    getProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');
const {
    getProductValidator,
    updateProductValidator,
    deleteProductValidator,
    createProductValidator,
} = require('../utils/validators/productValidator');

const router = express.Router();

router.route('/').get(getProducts).post(createProductValidator, createProduct);
router
    .route('/:idP')
    .get(getProductValidator, getProduct)
    .put(updateProductValidator, updateProduct)
    .delete(deleteProductValidator, deleteProduct);

module.exports = router;
