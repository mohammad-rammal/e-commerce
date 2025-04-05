const express = require('express');
const subCategoriesRoute = require('./subCategoryRoute');
const {
    getCategoryValidator,
    createCategoryValidator,
    updateCategoryValidator,
    deleteCategoryValidator,
} = require('../utils/validators/categoryValidator');
const {
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory,
    createCategory,
    uploadCategoryImage,
    resizeImage,
} = require('../controllers/categoryController');

const authService = require('../controllers/authController');

const router = express.Router();

// for mergeParams use (Nested Route)
router.use('/:categoryId/subCategories', subCategoriesRoute);

router.route('/').get(getCategories).post(
    // authService.protect,
    // authService.allowedTo('admin', 'manager'),
    uploadCategoryImage,
    resizeImage,
    createCategoryValidator,
    createCategory,
);

router
    .route('/:id')
    .get(getCategoryValidator, getCategory)
    .put(
        authService.protect,
        authService.allowedTo('admin', 'manager'),
        uploadCategoryImage,
        resizeImage,
        updateCategoryValidator,
        updateCategory,
    )
    .delete(authService.protect, authService.allowedTo('admin'), deleteCategoryValidator, deleteCategory);

module.exports = router;
