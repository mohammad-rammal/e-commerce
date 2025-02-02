const express = require('express');
const {
    getUsers,
    uploadUserImage,
    resizeImage,
    createUser,
    getUser,
    updateUser,
    deleteUser,
} = require('../controllers/userController');
const {
    createUserValidator,
    deleteUserValidator,
    updateUserValidator,
    getUserValidator,
} = require('../utils/validators/userValidator');

const router = express.Router();

router.route('/').get(getUsers).post(uploadUserImage, resizeImage, createUserValidator, createUser);
router
    .route('/:id')
    .get(getUserValidator, getUser)
    .put(uploadUserImage, resizeImage, updateUserValidator, updateUser)
    .delete(deleteUserValidator, deleteUser);

module.exports = router;
