const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const CartModel = require('../models/cartModel');
const ProductModel = require('../models/productModel');
const CouponModel = require('../models/couponModel');

const calcTotalCartPrice = (cart) => {
    let totalPrice = 0;
    cart.cartItems.forEach((productItem) => {
        totalPrice += productItem.quantity * productItem.price;
    });
    cart.totalCartPrice = totalPrice;
    cart.totalPriceAfterDiscount = undefined;

    return totalPrice;
};

/****************************************
 * @desc     Add product to cart
 * @route    POST /api/v1/cart
 * @access   Private/ User (Protect)
 ****************************************/
exports.addProductToCart = asyncHandler(async (req, res, next) => {
    const {productId, color} = req.body;
    const product = await ProductModel.findById(productId);
    // 1- Get cart for logged user
    let cart = await CartModel.findOne({
        user: req.user._id,
    });
    if (!cart) {
        //- Create cart for logged user with product
        cart = await CartModel.create({
            user: req.user._id,
            // can use addToSet
            cartItems: [
                {
                    product: productId,
                    color,
                    price: product.price,
                },
            ],
        });
    } else {
        // Cart already exist =>
        //- product exist in cart => update product quantity
        const productIndex = cart.cartItems.findIndex(
            (item) => item.product.toString() === productId && item.color === color,
        );
        // add quantity for product which already exist
        if (productIndex > -1) {
            const cartItem = cart.cartItems[productIndex];
            cartItem.quantity += 1;

            cart.cartItems[productIndex] = cartItem;
        } else {
            //- product not exist in cart => push product to cartItems array
            cart.cartItems.push({
                product: productId,
                color,
                price: product.price,
            });
        }
    }

    // 2- Calculate total cart price
    calcTotalCartPrice(cart);

    await cart.save();

    res.status(200).json({
        status: 'Success',
        message: 'Product added to cart successfully.',
        numOfCartItems: cart.cartItems.length,
        data: cart,
    });
});

/****************************************
 * @desc     Get logged user cart
 * @route    POST /api/v1/cart
 * @access   Private/ User (Protect)
 ****************************************/
exports.getLoggedUserCart = asyncHandler(async (req, res, next) => {
    const cart = await CartModel.findOne({
        user: req.user._id,
    });

    if (!cart) {
        return next(new ApiError(`There is no cart for this user id: ${req.user._id}`, 404));
    }

    res.status(200).json({
        status: 'Success',
        numOfCartItems: cart.cartItems.length,
        data: cart,
    });
});

/****************************************
 * @desc     Remove specific cart item
 * @route    DELETE /api/v1/cart/:itemId
 * @access   Private/ User (Protect)
 ****************************************/
exports.removeSpecificCartItem = asyncHandler(async (req, res, next) => {
    const cart = await CartModel.findOneAndUpdate(
        {
            user: req.user._id,
        },
        {
            $pull: {cartItems: {_id: req.params.itemId}},
        },
        {new: true},
    );

    calcTotalCartPrice(cart);
    await cart.save();

    res.status(200).json({
        status: 'Success',
        message: 'Item removed successfully from cart.',
        numOfCartItems: cart.cartItems.length,
        data: cart,
    });
});

/****************************************
 * @desc     Clear logged user cart
 * @route    DELETE /api/v1/cart
 * @access   Private/ User (Protect)
 ****************************************/
exports.clearCart = asyncHandler(async (req, res, next) => {
    await CartModel.findOneAndDelete({
        user: req.user._id,
    });

    res.status(204).send();
});

/****************************************
 * @desc     Update specific cart item quantity
 * @route    PUT /api/v1/cart/:itemId
 * @access   Private/ User (Protect)
 ****************************************/
exports.updateCartItemQuantity = asyncHandler(async (req, res, next) => {
    const {quantity} = req.body;

    const cart = await CartModel.findOne({
        user: req.user._id,
    });
    if (!cart) {
        return next(new ApiError(`There is no cart for user ${req.user._id}`, 404));
    }

    const itemIndex = cart.cartItems.findIndex((item) => item._id.toString() === req.params.itemId);
    if (itemIndex > -1) {
        const cartItem = cart.cartItems[itemIndex];
        cartItem.quantity = quantity;
        cart.cartItems[itemIndex] = cartItem;
    } else {
        return next(new ApiError(`There is no item for this id: ${req.params.itemId}`, 404));
    }

    calcTotalCartPrice(cart);
    await cart.save();

    res.status(200).json({
        status: 'Success',
        message: 'Item updated quantity successfully.',
        numOfCartItems: cart.cartItems.length,
        data: cart,
    });
});

/****************************************
 * @desc     Apply coupon on logged user cart
 * @route    PUT /api/v1/cart/applyCoupon
 * @access   Private/ User (Protect)
 ****************************************/
exports.applyCoupon = asyncHandler(async (req, res, next) => {
    // 1- Get coupon based on coupon name
    const coupon = CouponModel.findOne({name: req.body.coupon, expire: {$gt: Date.now()}});
    if (!coupon) {
        return next(new ApiError(`Coupon is invalid or expired!`, 404));
    }

    // 2- Get logged user cart to get total cart price
    const cart = await CartModel.findOne({user: req.user._id});

    const totalPrice = cart.totalCartPrice;

    // 3- Calculate price after discount
    const totalPriceAfterDiscount = (totalPrice - (totalPrice * coupon.discount) / 100).toFixed(2);

    cart.totalPriceAfterDiscount = totalPriceAfterDiscount;
    await cart.save();

    res.status(200).json({
        status: 'Success',
        message: 'Applied coupon successfully.',
        numOfCartItems: cart.cartItems.length,
        data: cart,
    });
});
