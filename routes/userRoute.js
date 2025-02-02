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

const router = express.Router();

router.route('/').get(getUsers).post(uploadUserImage, resizeImage, createUser);
router.route('/:id').get(getUser).put(uploadUserImage, resizeImage, updateUser).delete(deleteUser);

module.exports = router;
