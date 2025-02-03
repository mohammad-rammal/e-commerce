const asyncHandler = require('express-async-handler');
const {v4: uuidv4} = require('uuid');
const sharp = require('sharp');
const bcrypt = require('bcryptjs');

const {uploadSingleImage} = require('../middlewares/uploadImageMiddleware');
const UserModel = require('../models/userModel');
const factory = require('./handlersFactory');
const ApiError = require('../utils/apiError');

exports.uploadUserImage = uploadSingleImage('profileImg');

// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
    const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;

    if (req.file) {
        await sharp(req.file.buffer)
            .resize(600, 600)
            .toFormat('jpeg')
            .jpeg({quality: 95})
            .toFile(`uploads/users/${filename}`);

        // Save image into DB
        req.body.profileImg = filename;
    }

    next();
});

/****************************************
 * @desc     Get list of users
 * @route    GET /api/v1/users
 * @access   Private/Admin
 ****************************************/
exports.getUsers = factory.getAll(UserModel);

/****************************************
 * @desc     Get specific user by ID
 * @route    GET /api/v1/users/:id
 * @access   Private/Admin
 ****************************************/
exports.getUser = factory.getOne(UserModel);

/****************************************
 * @desc     Create user
 * @route    POST /api/v1/users
 * @access   Private/Admin
 ****************************************/
exports.createUser = factory.createOne(UserModel);

/****************************************
 * @desc     Update specific user
 * @route    PUT /api/v1/users/:id
 * @access   Private/Admin
 ****************************************/
exports.updateUser = asyncHandler(async (req, res, next) => {
    const document = await UserModel.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            slug: req.body.slug,
            phone: req.body.phone,
            profileImg: req.body.profileImg,
            role: req.body.role,
        },
        {new: true},
    );

    if (!document) {
        return next(new ApiError(`No document for this ID: ${req.params.id}`, 404));
    }
    res.status(200).json({
        data: document,
    });
});

/****************************************
 * @desc     Update password for specific user
 * @route    PUT /api/v1/users/:id
 * @access   Private/Admin
 ****************************************/
exports.changeUserPassword = asyncHandler(async (req, res, next) => {
    const document = await UserModel.findByIdAndUpdate(
        req.params.id,
        {
            password: await bcrypt.hash(req.body.password, 12),
            passwordChangedAt: Date.now(),
        },
        {new: true},
    );

    if (!document) {
        return next(new ApiError(`No document for this ID: ${req.params.id}`, 404));
    }
    res.status(200).json({
        data: document,
    });
});

/****************************************
 * @desc     Delete specific user
 * @route    DELETE /api/v1/users/:id
 * @access   Private/Admin
 ****************************************/
exports.deleteUser = factory.deleteOne(UserModel);
