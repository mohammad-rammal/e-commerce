const express = require('express');

const authService = require('../controllers/authController');
const {
    createCashOrder,
    findAllOrders,
    findSpecificOrder,
    filterOrderForLoggedUser,
    updateOrderToPaid,
    updateOrderToDelivered,
    checkoutSession,
} = require('../controllers/OrderController');

const router = express.Router();

router.use(authService.protect);

router.route('/:cartId').post(authService.allowedTo('user'), createCashOrder);
router.get('/', authService.allowedTo('user', 'manager', 'admin'), filterOrderForLoggedUser, findAllOrders);
router.get('/:id', authService.allowedTo('user'), findSpecificOrder);
router.put('/:id/pay', authService.allowedTo('manager', 'admin'), updateOrderToPaid);
router.put('/:id/deliver', authService.allowedTo('manager', 'admin'), updateOrderToDelivered);

router.get('/checkout-session/:cartId', authService.allowedTo('user'), checkoutSession);

module.exports = router;
