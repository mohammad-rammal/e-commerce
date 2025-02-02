const slugify = require('slugify');
const {check, body} = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.getUserValidator = [check('id').isMongoId().withMessage('Invalid User ID Format'), validatorMiddleware];

exports.createUserValidator = [
    check('name')
        .notEmpty()
        .withMessage('User required!')
        .isLength({min: 6})
        .withMessage('Must be more than 2 chars')
        .custom((val, {req}) => {
            req.body.slug = slugify(val);
            return true;
        }),
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
