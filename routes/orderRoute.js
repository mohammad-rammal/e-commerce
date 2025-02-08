const express = require('express');

const authService = require('../controllers/authController');
const {
    createCashOrder,
    findAllOrders,
    findSpecificOrder,
    filterOrderForLoggedUser,
} = require('../controllers/OrderController');

const router = express.Router();

router.use(authService.protect);

router.route('/:cartId').post(authService.allowedTo('user'), createCashOrder);
router.get('/', authService.allowedTo('user', 'manager', 'admin'), filterOrderForLoggedUser, findAllOrders);
router.get('/:id', authService.allowedTo('user'), findSpecificOrder);

module.exports = router;
