const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserModel = require('../models/userModel');
const ApiError = require('../utils/apiError');

const createToken = (payload) => {
    return jwt.sign({userId: payload}, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRE_TIME});
};

/****************************************
 * @desc     Signup User
 * @route    POST /api/v1/auth/signup
 * @access   Public
 ****************************************/
exports.signup = asyncHandler(async (req, res, next) => {
    // 1- Create user
    const user = await UserModel.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

    // 2- Generate token (JWT)
    const token = createToken(user._id);

    res.status(201).json({
        data: user,
        token,
    });
});

/****************************************
 * @desc     Login User
 * @route    POST /api/v1/auth/login
 * @access   Public
 ****************************************/
exports.login = asyncHandler(async (req, res, next) => {
    // 1- Check if email and password in body
    // 2- check if user exist and check if password is correct
    const user = await UserModel.findOne({
        email: req.body.email,
    });

    // const isCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return next(new ApiError('Incorrect email or password', 401));
    }

    // 3- generate token
    const token = createToken(user._id);

    // 4- send response to client side
    res.status(200).json({
        data: user,
        token,
    });
});
