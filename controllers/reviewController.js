const asyncHandler = require('express-async-handler');

const factory = require('./handlersFactory');
const ReviewModel = require('../models/reviewModel');

/****************************************
 * @desc     Get list of reviews
 * @route    GET /api/v1/reviews
 * @access   Public
 ****************************************/
exports.getReviews = factory.getAll(ReviewModel);

/****************************************
 * @desc     Get specific review by ID
 * @route    GET /api/v1/reviews/:id
 * @access   Public
 ****************************************/
exports.getReview = factory.getOne(ReviewModel);

/****************************************
 * @desc     Create review
 * @route    POST /api/v1/reviews
 * @access   Private/ User (Protect)
 ****************************************/
exports.createReview = factory.createOne(ReviewModel);

/****************************************
 * @desc     Update specific review
 * @route    PUT /api/v1/reviews/:id
 * @access   Private/ User (Protect)
 ****************************************/
exports.updateReview = factory.updateOne(ReviewModel);

/****************************************
 * @desc     Delete specific review
 * @route    DELETE /api/v1/reviews/:id
 * @access   Private/ User-Manager-Admin (Protect)
 ****************************************/
exports.deleteReview = factory.deleteOne(ReviewModel);
