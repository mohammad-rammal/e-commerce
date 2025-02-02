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

const router = express.Router();

router.put('/changePassword/:id', changeUserPasswordValidator, changeUserPassword);

router.route('/').get(getUsers).post(uploadUserImage, resizeImage, createUserValidator, createUser);
router
    .route('/:id')
    .get(getUserValidator, getUser)
    .put(uploadUserImage, resizeImage, updateUserValidator, updateUser)
    .delete(deleteUserValidator, deleteUser);

module.exports = router;
