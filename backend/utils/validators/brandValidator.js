const slugify = require('slugify');
const {check, body} = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.getBrandValidator = [check('id').isMongoId().withMessage('Invalid Brand ID Format'), validatorMiddleware];

exports.createBrandValidator = [
    check('name')
        .notEmpty()
        .withMessage('Brand required!')
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

exports.updateBrandValidator = [
    check('id').isMongoId().withMessage('Invalid Brand ID Format'),
    body('name')
        .optional()
        .custom((val, {req}) => {
            req.body.slug = slugify(val);
            return true;
        }),
    validatorMiddleware,
];

exports.deleteBrandValidator = [check('id').isMongoId().withMessage('Invalid Brand ID Format'), validatorMiddleware];
