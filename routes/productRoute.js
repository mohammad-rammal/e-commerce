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

const authService = require('../controllers/authController');

const router = express.Router();

router
    .route('/')
    .get(getProducts)
    .post(
        authService.protect,
        authService.allowedTo('admin', 'manager'),
        uploadProductImages,
        resizeProductImages,
        createProductValidator,
        createProduct,
    );
router
    .route('/:id')
    .get(getProductValidator, getProduct)
    .put(
        authService.protect,
        authService.allowedTo('admin', 'manager'),
        uploadProductImages,
        resizeProductImages,
        updateProductValidator,
        updateProduct,
    )
    .delete(authService.protect, authService.allowedTo('admin'), deleteProductValidator, deleteProduct);

module.exports = router;
