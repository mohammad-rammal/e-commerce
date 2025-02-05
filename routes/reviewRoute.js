const express = require('express');

const {getReviews, createReview, getReview, updateReview, deleteReview} = require('../controllers/reviewController');
const {
    createReviewValidator,
    updateReviewValidator,
    getReviewValidator,
    deleteReviewValidator,
} = require('../utils/validators/reviewValidator');
const authService = require('../controllers/authController');

const router = express.Router();

router
    .route('/')
    .get(getReviews)
    .post(authService.protect, authService.allowedTo('user'), createReviewValidator, createReview);
router
    .route('/:id')
    .get(getReviewValidator, getReview)
    .put(authService.protect, authService.allowedTo('user'), updateReviewValidator, updateReview)
    .delete(
        authService.protect,
        authService.allowedTo('user', 'manager', 'admin'),
        deleteReviewValidator,
        deleteReview,
    );

module.exports = router;
