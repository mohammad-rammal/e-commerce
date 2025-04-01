const crypto = require('crypto');

const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserModel = require('../models/userModel');
const ApiError = require('../utils/apiError');
const sendEmail = require('../utils/sendEmail');
const createToken = require('../utils/createToken');
const {sanitizeUser} = require('../utils/sanitizeData');

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
        data: sanitizeUser(user),
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

/****************************************
 * @desc  Verify if the user is logged in
 ****************************************/
exports.protect = asyncHandler(async (req, res, next) => {
    // 1- Check if token exist, if exist get it
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new ApiError('You are not login, please login!', 401));
    }

    // 2- Verify token (no change happens, expired token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // 3- Check if user exist
    const currentUser = await UserModel.findById(decoded.userId);
    if (!currentUser) {
        return next(new ApiError('The user that belong to this token does no longer exist', 401));
    }

    // 4- Check if user change his password after token created
    let passwordChangedAtTimestamp;

    if (currentUser.passwordChangedAt) {
        passwordChangedAtTimestamp = parseInt(currentUser.passwordChangedAt.getTime() / 1000, 10); // ms => s
        // console.log(passwordChangedAtTimestamp, decoded.iat);
    }

    // Password changed after token created
    if (passwordChangedAtTimestamp && passwordChangedAtTimestamp > decoded.iat) {
        return next(new ApiError('User recently changed his password, please login again..', 401));
    }

    req.user = currentUser;
    // console.log(req.user);

    next();
});

/****************************************
 * @desc  Authorization (User Permissions)
 ****************************************/
exports.allowedTo = (...roles) =>
    // excluders
    asyncHandler(async (req, res, next) => {
        // 1- Access roles
        // 2- Access registered user (req.user.role)

        if (!roles.includes(req.user.role)) {
            return next(new ApiError('You are not allowed to access this route!', 403));
        }
        next();
    });

/****************************************
 * @desc     Forgot Password
 * @route    POST /api/v1/auth/forgotPassword
 * @access   Public
 ****************************************/
exports.forgetPassword = asyncHandler(async (req, res, next) => {
    // 1- Get user by email
    const user = await UserModel.findOne({
        email: req.body.email,
    });
    if (!user) {
        return next(new ApiError(`There is no user with this email: ${req.body.email}`, 404));
    }

    // 2- If user exist, Generate hash reset random 6 digits and save it in db
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedResetCode = crypto.createHmac('sha256', process.env.SECRET_CRYPTO).update(resetCode).digest('hex');

    // Save hashed password reset code into db with expiration time 10m
    user.passwordResetCode = hashedResetCode;
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10m
    user.passwordResetVerified = false;

    await user.save();
    const message = `
                    Hi ${user.name}, \n \n
                    We received a request. \n
                    ${resetCode} \n \n
                    Enter this code please.
                    `;

    // 3- Send the reset code via email
    try {
        await sendEmail({
            email: user.email,
            subject: 'Your password reset code (valid for 10 min)',
            message,
        });
    } catch (error) {
        user.passwordResetCode = undefined;
        user.passwordResetExpires = undefined;
        user.passwordResetVerified = undefined;

        await user.save();
        return next(new ApiError('There is an error in sending email', 500));
    }

    res.status(200).json({
        status: 'Success',
        message: 'Reset code sent to email',
    });
});

/****************************************
 * @desc     Verify Password Reset Code
 * @route    POST /api/v1/auth/verifyPasswordResetCode
 * @access   Public
 ****************************************/
exports.verifyPasswordResetCode = asyncHandler(async (req, res, next) => {
    // 1- Get user based on reset code
    const hashedResetCode = crypto
        .createHmac('sha256', process.env.SECRET_CRYPTO)
        .update(req.body.resetCode)
        .digest('hex');

    const user = await UserModel.findOne({
        passwordResetCode: hashedResetCode,
        passwordResetExpires: {$gt: Date.now()},
    });
    if (!user) {
        return next(new ApiError('Invalid reset code or expired!', 400));
    }

    // 2- Reset code valid
    user.passwordResetVerified = true;
    await user.save;

    res.status(200).json({
        status: 'Success',
        message: 'Success verify password reset code',
    });
});

/****************************************
 * @desc     Reset Password
 * @route    POST /api/v1/auth/resetPassword
 * @access   Public
 ****************************************/
exports.resetPassword = asyncHandler(async (req, res, next) => {
    // 1- Get user based on email
    const user = await UserModel.findOne({email: req.body.email});

    if (!user) {
        return next(new ApiError(`There is no user for this email: ${req.body.email}`, 404));
    }

    // 2- Check if reset code verified
    if (!user.passwordResetVerified) {
        return next(new ApiError('Reset code not verified, please check your emailagain..'), 400);
    }

    user.password = req.body.newPassword;

    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetVerified = undefined;

    await user.save();

    // 3- If everything is ok, generate new token
    const token = createToken(user._id);

    res.status(200).json({
        token,
    });
});
