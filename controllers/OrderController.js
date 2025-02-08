const asyncHandler = require('express-async-handler');

const factory = require('./handlersFactory');
const ApiError = require('../utils/apiError');
const CartModel = require('../models/cartModel');
const OrderModel = require('../models/orderModel');
const ProductModel = require('../models/productModel');

exports.filterOrderForLoggedUser = asyncHandler(async (req, res, next) => {
    if (req.user.role === 'user') req.filterObject = {user: req.user._id};
    next();
});

/****************************************
 * @desc     Create cash order
 * @route    POST /api/v1/orders/:cartId
 * @access   Private/ User (Protect)
 ****************************************/
exports.createCashOrder = asyncHandler(async (req, res, next) => {
    // application settings
    const taxPrice = 0;
    const shippingPrice = 0;

    // 1- Get cart depend on cartId
    const cart = await CartModel.findById(req.params.cartId);
    if (!cart) {
        return next(new ApiError(`There is no cart with id ${req.params.cartId}`, 404));
    }

    // 2- Get order price depend on cart price (check if coupon applied)
    const cartPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalCartPrice;

    const totalOrderPrice = cartPrice + taxPrice + shippingPrice;

    // 3- Create order with default payment method type cash
    const order = await OrderModel.create({
        user: req.user._id,
        cartItems: cart.cartItems,
        shippingAddress: req.body.shippingAddress,
        totalOrderPrice,
    });

    // 4- After creating order, will decrement product quantity, will increment product sold
    if (order) {
        const bulkOption = cart.cartItems.map((item) => ({
            updateOne: {
                filter: {_id: item.product},
                update: {$inc: {quantity: -item.quantity, sold: +item.quantity}},
            },
        }));
        await ProductModel.bulkWrite(bulkOption, {});

        // 5- Clear cart depend on cartId
        await CartModel.findByIdAndDelete(req.params.cartId);
    }

    res.status(201).json({
        status: 'Success',
        message: 'Order created successfully.',
        numOfCartItems: cart.cartItems.length,
        data: order,
    });
});

/****************************************
 * @desc     Get all orders
 * @route    GET /api/v1/orders
 * @access   Private/ User-Manager-Admin (Protect)
 ****************************************/
exports.findAllOrders = factory.getAll(OrderModel);

/****************************************
 * @desc     Get specific order
 * @route    GET /api/v1/orders/:id
 * @access   Private/ User (Protect)
 ****************************************/
exports.findSpecificOrder = factory.getOne(OrderModel);
