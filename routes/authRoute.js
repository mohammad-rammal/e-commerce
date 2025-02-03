const express = require('express');
const {signupValidator, loginValidator} = require('../utils/validators/authValidator');
const {signup, login, forgetPassword} = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signupValidator, signup);
router.get('/login', loginValidator, login);

router.post('/forgotPassword', forgetPassword);

module.exports = router;
