const slugify = require('slugify');
const bcrypt = require('bcryptjs');

const {check, body} = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const UserModel = require('../../models/userModel');

exports.getUserValidator = [check('id').isMongoId().withMessage('Invalid User ID Format'), validatorMiddleware];

exports.createUserValidator = [
    check('name')
        .notEmpty()
        .withMessage('User required!')
        .isLength({min: 2})
        .withMessage('Must be more than 2 chars')
        .custom((val, {req}) => {
            req.body.slug = slugify(val);
            return true;
        }),

    check('email')
        .notEmpty()
        .withMessage('Email required!')
        .isEmail()
        .withMessage('Invalid email address!')
        .custom((val) =>
            UserModel.findOne({email: val}).then((user) => {
                if (user) {
                    return Promise.reject(new Error('Email already exists!'));
                }
            }),
        ),

    check('password')
        .notEmpty()
        .withMessage('PAssword is required!')
        .isLength({min: 6})
        .withMessage('Must be more than 6 chars')
        .custom((password, {req}) => {
            if (password !== req.body.passwordConfirm) {
                throw new Error('Password confirmation incorrect');
            }
            return true;
        }),

    check('passwordConfirm').notEmpty().withMessage('Password confirmation required!'),

    check('phone').optional().isMobilePhone(['ar-LB', 'en-US']).withMessage('Invalid phone number!'),

    check('profileImg').optional(),

    check('role').optional(),

    validatorMiddleware,
];

exports.updateUserValidator = [
    // check: for params and body
    check('id').isMongoId().withMessage('Invalid User ID Format'),
    body('name')
        .optional()
        .custom((val, {req}) => {
            req.body.slug = slugify(val);
            return true;
        }),

    check('email')
        .notEmpty()
        .withMessage('Email required!')
        .isEmail()
        .withMessage('Invalid email address!')
        .custom((val) =>
            UserModel.findOne({email: val}).then((user) => {
                if (user) {
                    return Promise.reject(new Error('Email already exists!'));
                }
            }),
        ),

    check('phone').optional().isMobilePhone(['ar-LB', 'en-US']).withMessage('Invalid phone number!'),

    check('profileImg').optional(),

    check('role').optional(),

    validatorMiddleware,
];

exports.changeUserPasswordValidator = [
    check('id').isMongoId().withMessage('Invalid User ID Format'),
    body('currentPassword').notEmpty().withMessage('Must enter your current password!'),
    body('passwordConfirm').notEmpty().withMessage('Password confirmation required!'),
    body('password')
        .notEmpty()
        .withMessage('Password required!')
        // val is the password
        .custom(async (val, {req}) => {
            // 1- Verify current password
            const user = await UserModel.findById(req.params.id);
            if (!user) {
                throw new Error('The user is not exist for this ID!');
            }
            const isCorrectPassword = await bcrypt.compare(req.body.currentPassword, user.password);

            if (!isCorrectPassword) {
                throw new Error('Incorrect current password!');
            }

            // 2- Verify password confirm
            if (val !== req.body.passwordConfirm) {
                throw new Error('Password confirmation incorrect');
            }
            return true;
        }),

    validatorMiddleware,
];

exports.deleteUserValidator = [check('id').isMongoId().withMessage('Invalid User ID Format'), validatorMiddleware];

exports.updateLoggedUserValidator = [
    // check: for params and body
    body('name')
        .optional()
        .custom((val, {req}) => {
            req.body.slug = slugify(val);
            return true;
        }),

    check('email')
        .notEmpty()
        .withMessage('Email required!')
        .isEmail()
        .withMessage('Invalid email address!')
        .custom((val) =>
            UserModel.findOne({email: val}).then((user) => {
                if (user) {
                    return Promise.reject(new Error('Email already exists!'));
                }
            }),
        ),

    check('phone').optional().isMobilePhone(['ar-LB', 'en-US']).withMessage('Invalid phone number!'),

    validatorMiddleware,
];
