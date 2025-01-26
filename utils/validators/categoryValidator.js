const {check} = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

// Array of Rules
//
exports.getCategoryValidator = [
    // 1- rules
    check('idC').isMongoId().withMessage('Invalid Category ID Format'),

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
        .withMessage('Must be less than 30 chars'),

    validatorMiddleware,
];

exports.updateCategoryValidator = [
    check('idC').isMongoId().withMessage('Invalid Category ID Format'),

    validatorMiddleware,
];

exports.deleteCategoryValidator = [
    check('idC').isMongoId().withMessage('Invalid Category ID Format'),

    validatorMiddleware,
];
