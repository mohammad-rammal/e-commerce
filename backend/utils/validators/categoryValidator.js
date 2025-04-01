const slugify = require('slugify');
const {check, body} = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

// Separation of concern
// Array of Rules
//
exports.getCategoryValidator = [
    // 1- rules
    check('id')
        .isMongoId()
        .withMessage('Invalid Category ID Format')
        .custom((val, {req}) => {
            req.body.slug = slugify(val);
            return true;
        }),
    // 2- middleware to catch errors from rules if exist
    validatorMiddleware,
];

exports.createCategoryValidator = [
    check('name')
        .notEmpty()
        .withMessage('Category required!')
        .isLength({min: 2})
        .withMessage('Must be more than 2 chars')
        .isLength({max: 30})
        .withMessage('Must be less than 30 chars')
        .custom((val, {req}) => {
            req.body.slug = slugify(val);
            return true;
        }),

    validatorMiddleware,
];

exports.updateCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid Category ID Format'),
    body('name')
        .optional()
        .custom((val, {req}) => {
            req.body.slug = slugify(val);
            return true;
        }),
    validatorMiddleware,
];

exports.deleteCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid Category ID Format'),

    validatorMiddleware,
];
