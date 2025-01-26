const {check} = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.getBrandValidator = [check('idC').isMongoId().withMessage('Invalid Brand ID Format'), validatorMiddleware];

exports.createBrandValidator = [
    check('name')
        .notEmpty()
        .withMessage('Brand required!')
        .isLength({min: 2})
        .withMessage('Must be more than 2 chars')
        .isLength({max: 30})
        .withMessage('Must be less than 30 chars'),

    validatorMiddleware,
];

exports.updateBrandValidator = [check('idC').isMongoId().withMessage('Invalid Brand ID Format'), validatorMiddleware];

exports.deleteBrandValidator = [check('idC').isMongoId().withMessage('Invalid Brand ID Format'), validatorMiddleware];
