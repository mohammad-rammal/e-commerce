const slugify = require('slugify');
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
    check('id').isMongoId().withMessage('Invalid User ID Format'),
    body('name')
        .optional()
        .custom((val, {req}) => {
            req.body.slug = slugify(val);
            return true;
        }),
    validatorMiddleware,
];

exports.deleteUserValidator = [check('id').isMongoId().withMessage('Invalid User ID Format'), validatorMiddleware];
