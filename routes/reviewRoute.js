const express = require('express');

const {getReviews, createReview, getReview, updateReview, deleteReview} = require('../controllers/reviewController');
const authService = require('../controllers/authController');

const router = express.Router();

router.route('/').get(getReviews).post(authService.protect, authService.allowedTo('user'), createReview);
router
    .route('/:id')
    .get(getReview)
    .put(authService.protect, authService.allowedTo('user'), updateReview)
    .delete(authService.protect, authService.allowedTo('user', 'manager', 'admin'), deleteReview);

module.exports = router;
