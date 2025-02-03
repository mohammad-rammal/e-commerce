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
} = require('../controllers/userController');
const {
    createUserValidator,
    deleteUserValidator,
    updateUserValidator,
    getUserValidator,
    changeUserPasswordValidator,
} = require('../utils/validators/userValidator');

const authService = require('../controllers/authController');

const router = express.Router();

router.put('/changePassword/:id', changeUserPasswordValidator, changeUserPassword);

router
    .route('/')
    .get(authService.protect, authService.allowedTo('admin'), getUsers)
    .post(
        authService.protect,
        authService.allowedTo('admin'),
        uploadUserImage,
        resizeImage,
        createUserValidator,
        createUser,
    );
router
    .route('/:id')
    .get(authService.protect, authService.allowedTo('admin'), getUserValidator, getUser)
    .put(
        authService.protect,
        authService.allowedTo('admin'),
        uploadUserImage,
        resizeImage,
        updateUserValidator,
        updateUser,
    )
    .delete(authService.protect, authService.allowedTo('admin'), deleteUserValidator, deleteUser);

module.exports = router;
