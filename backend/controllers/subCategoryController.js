const SubCategoryModel = require('../models/subCategoryModel');
const factory = require('./handlersFactory');

exports.setCategoryIdToBody = (req, res, next) => {
    // Nested Route (create)
    if (!req.body.category) {
        req.body.category = req.params.categoryId;
    }
    next();
};

exports.createFilterObject = (req, res, next) => {
    // Nested Route (get)
    let filterObject = {};
    if (req.params.categoryId) {
        filterObject = {
            category: req.params.categoryId,
        };
    }
    req.filterObj = filterObject;
    next();
};

/****************************************
 * @desc     Get list of subCategories
 * @route    GET /api/v1/subCategories
 * @access   Public
 ****************************************/
exports.getSubCategories = factory.getAll(SubCategoryModel);

/****************************************
 * @desc     Get list of subCategories (Nested Route)
 * @route    GET /api/v1/categories/:categoryId/subCategories
 * @access   Public
 ****************************************/

/****************************************
 * @desc     Get specific subCategory by ID
 * @route    GET /api/v1/subCategories/:id
 * @access   Public
 ****************************************/
exports.getSubCategory = factory.getOne(SubCategoryModel);

/****************************************
 * @desc     Create subCategory
 * @route    POST /api/v1/subcategories
 * @access   Private
 ****************************************/
exports.createSubCategory = factory.createOne(SubCategoryModel);

/****************************************
 * @desc     Update specific subCategory
 * @route    PUT /api/v1/subCategories/:id
 * @access   Private
 ****************************************/
exports.updateSubCategory = factory.updateOne(SubCategoryModel);

/****************************************
 * @desc     Delete specific sub category
 * @route    DELETE /api/v1/subCategories/:id
 * @access   Private
 ****************************************/
exports.deleteSubCategory = factory.deleteOne(SubCategoryModel);
