const express = require('express');
const {
    getUsers,
    uploadUserImage,
    resizeImage,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    changeUserPassword,
    getLoggedUserData,
    updateLoggedUserPassword,
    updateLoggedUserData,
    deleteLoggedUserData,
} = require('../controllers/userController');
const {
    createUserValidator,
    deleteUserValidator,
    updateUserValidator,
    getUserValidator,
    changeUserPasswordValidator,
    updateLoggedUserValidator,
} = require('../utils/validators/userValidator');

const authService = require('../controllers/authController');

const router = express.Router();

router.use(authService.protect);
router.get('/getMe', getLoggedUserData, getUser);
router.put('/changeMyPassword', updateLoggedUserPassword);
router.put('/updateMe', updateLoggedUserData);
router.delete('/deleteMe', deleteLoggedUserData);

router.use(authService.allowedTo('admin'));
router.put('/changePassword/:id', changeUserPasswordValidator, updateLoggedUserValidator, changeUserPassword);
router
    .route('/')
    .get(authService.allowedTo('admin'), getUsers)
    .post(uploadUserImage, resizeImage, createUserValidator, createUser);
router
    .route('/:id')
    .get(getUserValidator, getUser)
    .put(uploadUserImage, resizeImage, updateUserValidator, updateUser)
    .delete(deleteUserValidator, deleteUser);

module.exports = router;
