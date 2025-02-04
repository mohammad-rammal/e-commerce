const express = require('express');
const {signupValidator, loginValidator} = require('../utils/validators/authValidator');
const {
    signup,
    login,
    forgetPassword,
    verifyPasswordResetCode,
    resetPassword,
} = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signupValidator, signup);
router.post('/login', loginValidator, login);

router.post('/forgotPassword', forgetPassword);
router.post('/verifyPasswordResetCode', verifyPasswordResetCode);
router.put('/resetPassword', resetPassword);

module.exports = router;
