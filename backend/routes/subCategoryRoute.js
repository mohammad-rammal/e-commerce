const express = require('express');
const {
    createSubCategory,
    getSubCategories,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory,
    setCategoryIdToBody,
    createFilterObject,
} = require('../controllers/subCategoryController');
const {
    createSubCategoryValidator,
    getSubCategoryValidator,
    deleteSubCategoryValidator,
    updateSubCategoryValidator,
} = require('../utils/validators/subCategoryValidator');

const authService = require('../controllers/authController');

// mergeParams: Allow to access parameters on other routers
// ex. access category ID from category router
const router = express.Router({mergeParams: true});

router.route('/').get(createFilterObject, getSubCategories).post(
    // authService.protect,
    // authService.allowedTo('admin', 'manager'),
    setCategoryIdToBody,
    createSubCategoryValidator,
    createSubCategory,
);
router
    .route('/:id')
    .get(getSubCategoryValidator, getSubCategory)
    .put(authService.protect, authService.allowedTo('admin', 'manager'), updateSubCategoryValidator, updateSubCategory)
    .delete(authService.protect, authService.allowedTo('admin'), deleteSubCategoryValidator, deleteSubCategory);

module.exports = router;
