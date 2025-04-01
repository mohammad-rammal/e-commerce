const slugify = require('slugify');

const {check} = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const UserModel = require('../../models/userModel');

exports.signupValidator = [
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

    validatorMiddleware,
];

exports.loginValidator = [
    check('email').notEmpty().withMessage('Email required!').isEmail().withMessage('Invalid email address!'),

    check('password')
        .notEmpty()
        .withMessage('PAssword is required!')
        .isLength({min: 6})
        .withMessage('Must be more than 6 chars'),

    validatorMiddleware,
];
