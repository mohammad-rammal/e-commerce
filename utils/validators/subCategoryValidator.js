const {check} = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

// Array of Rules
//
exports.getSubCategoryValidator = [
    check('idC').isMongoId().withMessage('Invalid SubCategory ID Format'),

    validatorMiddleware,
];

exports.createSubCategoryValidator = [
    check('name')
        .notEmpty()
        .withMessage('SubCategory required!')
        .isLength({min: 2})
        .withMessage('Must be more than 2 chars')
        .isLength({max: 32})
        .withMessage('Must be less than 32 chars'),

    check('category')
        .notEmpty()
        .withMessage('subCategory must be belong to category!')
        .isMongoId()
        .withMessage('Invalid SubCategory ID Format'),

    validatorMiddleware,
];

exports.updateSubCategoryValidator = [
    check('idC').isMongoId().withMessage('Invalid SubCategory ID Format'),

    validatorMiddleware,
];

exports.deleteSubCategoryValidator = [
    check('idC').isMongoId().withMessage('Invalid SubCategory ID Format'),

    validatorMiddleware,
];
