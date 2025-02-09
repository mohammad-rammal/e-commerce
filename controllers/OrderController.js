const asyncHandler = require('express-async-handler');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const factory = require('./handlersFactory');
const ApiError = require('../utils/apiError');
const CartModel = require('../models/cartModel');
const OrderModel = require('../models/orderModel');
const ProductModel = require('../models/productModel');
const UserModel = require('../models/userModel');

exports.filterOrderForLoggedUser = asyncHandler(async (req, res, next) => {
    if (req.user.role === 'user') req.filterObject = {user: req.user._id};
    next();
});

// no need for asyncHandler because not express middleware
const createCardOrder = async (session) => {
    const cartId = session.client_reference_id;
    const shippingAddress = session.metadata;

    const orderPrice = session.amount_total / 100;

    const cart = await CartModel.findById(cartId);
    const user = await UserModel.findOne({email: session.customer_email});

    // Create order with default payment method type card
    const order = await OrderModel.create({
        user: user._id,
        cartItems: cart.cartItems,
        shippingAddress,
        totalOrderPrice: orderPrice,
        isPaid: true,
        paidAt: Date.now(),
        paymentMethodType: 'card',
    });

    // After creating order, will decrement product quantity, will increment product sold
    if (order) {
        const bulkOption = cart.cartItems.map((item) => ({
            updateOne: {
                filter: {_id: item.product},
                update: {$inc: {quantity: -item.quantity, sold: +item.quantity}},
            },
        }));
        await ProductModel.bulkWrite(bulkOption, {});

        // 5- Clear cart depend on cartId
        await CartModel.findByIdAndDelete(cartId);
    }
};

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

/****************************************
 * @desc     Update order paid status to paid (true)
 * @route    GET /api/v1/orders/:id/pay
 * @access   Private/ Admin-Manager (Protect)
 ****************************************/
exports.updateOrderToPaid = asyncHandler(async (req, res, next) => {
    const order = await OrderModel.findById(req.params.id);
    if (!order) {
        return next(new ApiError(`There is no such order with id ${req.params.id}`, 404));
    }

    // Update order to paid
    order.isPaid = true;
    order.paidAt = Date.now();

    const updateOrder = await order.save();

    res.status(201).json({
        status: 'Success',
        message: 'Paid successfully.',
        data: updateOrder,
    });
});

/****************************************
 * @desc     Update order delivered status
 * @route    GET /api/v1/orders/:id/deliver
 * @access   Private/ Admin-Manager (Protect)
 ****************************************/
exports.updateOrderToDelivered = asyncHandler(async (req, res, next) => {
    const order = await OrderModel.findById(req.params.id);
    if (!order) {
        return next(new ApiError(`There is no such order with id ${req.params.id}`, 404));
    }

    // Update order to paid
    order.isDelivered = true;
    order.DeliveredAt = Date.now();

    const updateOrder = await order.save();

    res.status(201).json({
        status: 'Success',
        message: 'Delivered successfully.',
        data: updateOrder,
    });
});

/****************************************
 * @desc     Get checkout session from stripe and send it as response
 * @route    GET /api/v1/orders/checkout-session/:cartId
 * @access   Private/ User (Protect)
 ****************************************/
exports.checkoutSession = asyncHandler(async (req, res, next) => {
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

    // 3- Create stripe checkout session

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: `Order from ${req.user.name}`,
                    },
                    unit_amount: totalOrderPrice * 100, // Stripe requires amount in cents
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${req.protocol}://${req.get('host')}/orders`,
        cancel_url: `${req.protocol}://${req.get('host')}/cart`,
        customer_email: req.user.email,
        client_reference_id: req.params.cartId, // or: cart._id
        metadata: req.body.shippingAddress,
    });

    // 4- Send session to response
    res.status(200).json({
        status: 'Success',
        session,
    });
});

/****************************************
 * @desc     Webhook will run when stripe payment success paid
 * @route    POST /webhook-checkout
 * @access   Private/ User (Protect)
 ****************************************/
exports.webhookCheckout = asyncHandler(async (req, res, next) => {
    const sig = req.headers['stripe-signature'];
    console.log('Stripe Webhook');

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.log('Webhook signature verification failed:', err);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        try {
            await createCardOrder(event.data.object);
        } catch (error) {
            console.log('Error while creating order:', error);
            return res.status(500).json({error: 'Failed to process order'});
        }
    }

    res.status(200).json({received: true});
});
