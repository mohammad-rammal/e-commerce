const asyncHandler = require('express-async-handler');

const UserModel = require('../models/userModel');

/****************************************
 * @desc     Add address to user addresses list
 * @route    POST /api/v1/addresses
 * @access   Private/User (Protected)
 ****************************************/
exports.addAddress = asyncHandler(async (req, res, next) => {
    // $addToSet: add address object to user address array if addressId not exist
    const user = await UserModel.findByIdAndUpdate(
        req.user._id,
        {
            $addToSet: {addresses: req.body},
        },
        {new: true},
    );

    res.status(200).json({
        status: 'Success',
        message: 'Address added successfully.',
        data: user.addresses,
    });
});

/****************************************
 * @desc     Remove address from user addresses list
 * @route    DELETE /api/v1/addresses/:addressId
 * @access   Private/User (Protected)
 ****************************************/
exports.removeAddress = asyncHandler(async (req, res, next) => {
    // $pull: remove address object to user addresses array if addressId exist
    const user = await UserModel.findByIdAndUpdate(
        req.user._id,
        {
            $pull: {addresses: {_id: req.params.addressId}},
        },
        {new: true},
    );

    res.status(200).json({
        status: 'Success',
        message: 'Address removed successfully.',
        data: user.addresses,
    });
});

/****************************************
 * @desc     Get logged user addresses list
 * @route    GET /api/v1/addresses
 * @access   Private/User (Protected)
 ****************************************/
exports.getLoggedUserAddresses = asyncHandler(async (req, res, next) => {
    const user = await UserModel.findById(req.user._id).populate('addresses');

    res.status(200).json({
        status: 'Success',
        results: user.addresses.length,
        data: user.addresses,
    });
});
