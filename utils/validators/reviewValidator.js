const {check, body} = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const ReviewModel = require('../../models/reviewModel');

exports.getReviewValidator = [check('id').isMongoId().withMessage('Invalid Review ID Format'), validatorMiddleware];

exports.createReviewValidator = [
    check('title').optional(),

    check('ratings')
        .notEmpty()
        .withMessage('Ratings value required!')
        .isFloat({
            min: 1,
            max: 5,
        })
        .withMessage('Ratings value must be between 1.0 to 5.0'),

    check('user').isMongoId().withMessage('Invalid user id format'),

    check('product')
        .isMongoId()
        .withMessage('Invalid product id format')
        // call back have value and (don't want ratings) want to destruct req
        .custom((val, {req}) => {
            // check if logged user create review before
            return ReviewModel.findOne({
                user: req.user._id,
                product: req.body.product,
            }).then((review) => {
                if (review) {
                    return Promise.reject(new Error('You already created a review before!'));
                }
            });
        }),

    validatorMiddleware,
];

exports.updateReviewValidator = [
    check('id')
        .isMongoId()
        .withMessage('Invalid Review ID Format')
        .custom((val, {req}) => {
            // Check review ownership before update
            return ReviewModel.findById(
                // val: is the id review
                val,
            ).then((review) => {
                if (!review) {
                    return Promise.reject(new Error(`There is no review with this ID: ${val}`));
                }

                // after populate
                // console.log(review.user._id.toString()) :=> 67a096d71a2edb7c2cb27cb9
                // console.log(review.user._id) :=> new ObjectId('67a096d71a2edb7c2cb27cb9')

                if (review.user._id.toString() !== req.user._id.toString()) {
                    return Promise.reject(new Error('Not allowed to perform this action!'));
                }
            });
        }),
    validatorMiddleware,
];

exports.deleteReviewValidator = [
    check('id')
        .isMongoId()
        .withMessage('Invalid Review ID Format')
        .custom((val, {req}) => {
            // Check review ownership before delete
            if (req.user.role === 'user') {
                return ReviewModel.findById(val).then((review) => {
                    if (!review) {
                        return Promise.reject(new Error(`There is no review with this ID: ${val}`));
                    }
                    if (review.user._id.toString() !== req.user._id.toString()) {
                        return Promise.reject(new Error('Not allowed to perform this action!'));
                    }
                });
            }
            return true;
        }),

    validatorMiddleware,
];
