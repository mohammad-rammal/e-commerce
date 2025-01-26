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

// mergeParams: Allow to access parameters on other routers
// ex. access category ID from category router
const router = express.Router({mergeParams: true});

router
    .route('/')
    .get(createFilterObject, getSubCategories)
    .post(setCategoryIdToBody, createSubCategoryValidator, createSubCategory);
router
    .route('/:idC')
    .get(getSubCategoryValidator, getSubCategory)
    .put(updateSubCategoryValidator, updateSubCategory)
    .delete(deleteSubCategoryValidator, deleteSubCategory);

module.exports = router;
