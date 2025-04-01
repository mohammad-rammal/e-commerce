const express = require('express');

const {getCoupons, createCoupon, getCoupon, updateCoupon, deleteCoupon} = require('../controllers/couponController');
const authService = require('../controllers/authController');

const router = express.Router();

router.use(authService.protect, authService.allowedTo('admin', 'manager'));

router.route('/').get(getCoupons).post(createCoupon);
router.route('/:id').get(getCoupon).put(updateCoupon).delete(deleteCoupon);

module.exports = router;
