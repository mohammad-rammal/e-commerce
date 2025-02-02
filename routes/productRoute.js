const express = require('express');
const {
    getProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    resizeProductImages,
    uploadProductImages,
} = require('../controllers/productController');
const {
    getProductValidator,
    updateProductValidator,
    deleteProductValidator,
    createProductValidator,
} = require('../utils/validators/productValidator');

const router = express.Router();

router
    .route('/')
    .get(getProducts)
    .post(uploadProductImages, resizeProductImages, createProductValidator, createProduct);
router
    .route('/:id')
    .get(getProductValidator, getProduct)
    .put(uploadProductImages, resizeProductImages, updateProductValidator, updateProduct)
    .delete(deleteProductValidator, deleteProduct);

module.exports = router;
