const asyncHandler = require('express-async-handler');
const {v4: uuidv4} = require('uuid');
const sharp = require('sharp');

const {uploadSingleImage} = require('../middlewares/uploadImageMiddleware');
const UserModel = require('../models/userModel');
const factory = require('./handlersFactory');

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
 * @access   Private
 ****************************************/
exports.getUsers = factory.getAll(UserModel);

/****************************************
 * @desc     Get specific user by ID
 * @route    GET /api/v1/users/:id
 * @access   Private
 ****************************************/
exports.getUser = factory.getOne(UserModel);

/****************************************
 * @desc     Create user
 * @route    POST /api/v1/users
 * @access   Private
 ****************************************/
exports.createUser = factory.createOne(UserModel);

/****************************************
 * @desc     Update specific user
 * @route    PUT /api/v1/users/:id
 * @access   Private
 ****************************************/
exports.updateUser = factory.updateOne(UserModel);

/****************************************
 * @desc     Delete specific user
 * @route    DELETE /api/v1/users/:id
 * @access   Private
 ****************************************/
exports.deleteUser = factory.deleteOne(UserModel);
