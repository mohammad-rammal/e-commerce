const express = require('express');

const authService = require('../controllers/authController');
const {
    addProductToCart,
    getLoggedUserCart,
    removeSpecificCartItem,
    clearCart,
    updateCartItemQuantity,
    applyCoupon,
} = require('../controllers/cartController');

const router = express.Router();

router.use(authService.protect, authService.allowedTo('user'));

router.route('/').get(getLoggedUserCart).post(addProductToCart).delete(clearCart);
router.route('/:itemId').put(updateCartItemQuantity).delete(removeSpecificCartItem);
router.route('/applyCoupon').put(applyCoupon);

module.exports = router;
