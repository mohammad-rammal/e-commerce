const asyncHandler = require('express-async-handler');

const UserModel = require('../models/userModel');

/****************************************
 * @desc     Add product to wishlist
 * @route    POST /api/v1/wishlist
 * @access   Private/User (Protected)
 ****************************************/
exports.addProductToWishlist = asyncHandler(async (req, res, next) => {
    // $addToSet: add productId to wishlist array if productId not exist
    const user = await UserModel.findByIdAndUpdate(
        req.user._id,
        {
            $addToSet: {wishlist: req.body.productId},
        },
        {new: true},
    );

    res.status(200).json({
        status: 'Success',
        message: 'Product added successfully to your wishlist.',
        data: user.wishlist,
    });
});

/****************************************
 * @desc     Remove product to wishlist
 * @route    DELETE /api/v1/wishlist/:productId
 * @access   Private/User (Protected)
 ****************************************/
exports.removeProductFromWishlist = asyncHandler(async (req, res, next) => {
    // $pull: remove productId to wishlist array if productId exist
    const user = await UserModel.findByIdAndUpdate(
        req.user._id,
        {
            $pull: {wishlist: req.params.productId},
        },
        {new: true},
    );

    res.status(200).json({
        status: 'Success',
        message: 'Product removed successfully from your wishlist.',
        data: user.wishlist,
    });
});

/****************************************
 * @desc     Get logged user wishlist
 * @route    GET /api/v1/wishlist
 * @access   Private/User (Protected)
 ****************************************/
exports.getLoggedUserWishlist = asyncHandler(async (req, res, next) => {
    const user = await UserModel.findById(req.user._id).populate('wishlist');

    res.status(200).json({
        status: 'Success',
        results: user.wishlist.length,
        data: user.wishlist,
    });
});
