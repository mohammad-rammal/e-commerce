const slugify = require('slugify');
const {check, body} = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

// Array of Rules
//
exports.getSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid SubCategory ID Format'),

    validatorMiddleware,
];

exports.createSubCategoryValidator = [
    check('name')
        .notEmpty()
        .withMessage('SubCategory required!')
        .isLength({min: 2})
        .withMessage('Must be more than 2 chars')
        .isLength({max: 32})
        .withMessage('Must be less than 32 chars')
        .custom((val, {req}) => {
            req.body.slug = slugify(val);
            return true;
        }),
    check('category')
        .notEmpty()
        .withMessage('subCategory must be belong to category!')
        .isMongoId()
        .withMessage('Invalid SubCategory ID Format'),

    validatorMiddleware,
];

exports.updateSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid SubCategory ID Format'),
    body('name').custom((val, {req}) => {
        req.body.slug = slugify(val);
        return true;
    }),
    validatorMiddleware,
];

exports.deleteSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid SubCategory ID Format'),

    validatorMiddleware,
];
