const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const SubCategoryModel = require('../models/subCategoryModel');
const ApiError = require('../utils/apiError');

const setCategoryIdToBody = (req, res, next) => {
    // Nested Route
    if (!req.body.category) {
        req.body.category = req.params.categoryId;
    }
    next();
};

const createFilterObject = (req, res, next) => {
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
const getSubCategories = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;
    console.log(req.params);

    const subCategories = await SubCategoryModel.find(req.filterObj).skip(skip).limit(limit).populate('category');

    res.status(200).json({
        result: subCategories.length,
        page,
        data: subCategories,
    });
});

/****************************************
 * @desc     Get list of subCategories (Nested Route)
 * @route    GET /api/v1/categories/:categoryId/subCategories
 * @access   Public
 ****************************************/

/****************************************
 * @desc     Get specific subCategory by ID
 * @route    GET /api/v1/subCategories/:idC
 * @access   Public
 ****************************************/
const getSubCategory = asyncHandler(async (req, res, next) => {
    const {idC} = req.params;
    const subCategory = await SubCategoryModel.findById(idC).populate({path: 'category', select: 'name -_id'});
    if (!subCategory) {
        // res.status(404).json({msg: `No subCategory for this ID: ${idC}`});
        return next(new ApiError(`No subCategory for this ID: ${idC}`, 404));
    }
    res.status(200).json({
        data: subCategory,
    });
});

/****************************************
 * @desc     Create subCategory
 * @route    POST /api/v1/subcategories
 * @access   Private
 ****************************************/
const createSubCategory = asyncHandler(async (req, res) => {
    const {name, category} = req.body;

    const subCategory = await SubCategoryModel.create({
        name,
        slug: slugify(name),
        category,
    });

    res.status(201).json({data: subCategory});
});

/****************************************
 * @desc     Update specific subCategory
 * @route    PUT /api/v1/subCategories/:idC
 * @access   Private
 ****************************************/
const updateSubCategory = asyncHandler(async (req, res, next) => {
    const {idC} = req.params;
    const {name, category} = req.body;
    const subCategory = await SubCategoryModel.findOneAndUpdate(
        {_id: idC},
        {name, slug: slugify(name), category},
        {new: true},
    );

    if (!subCategory) {
        return next(new ApiError(`No subCategory for this ID: ${idC}`, 404));
    }
    res.status(200).json({
        data: subCategory,
    });
});

/****************************************
 * @desc     Delete specific sub category
 * @route    DELETE /api/v1/subCategories/:idC
 * @access   Private
 ****************************************/
const deleteSubCategory = asyncHandler(async (req, res, next) => {
    const {idC} = req.params;
    const subCategory = await SubCategoryModel.findByIdAndDelete(idC);

    if (!subCategory) {
        return next(new ApiError(`No subCategory for this ID: ${idC}`, 404));
    }
    res.status(204).send();
});

module.exports = {
    createSubCategory,
    getSubCategory,
    getSubCategories,
    updateSubCategory,
    deleteSubCategory,
    setCategoryIdToBody,
    createFilterObject,
};
