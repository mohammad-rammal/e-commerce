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
} = require('../controllers/categoryController');

const router = express.Router();

// for mergeParams use
router.use('/:categoryId/subCategories', subCategoriesRoute);
router.route('/').get(getCategories).post(createCategoryValidator, createCategory);
router
    .route('/:id')
    .get(getCategoryValidator, getCategory)
    .put(updateCategoryValidator, updateCategory)
    .delete(deleteCategoryValidator, deleteCategory);

module.exports = router;
