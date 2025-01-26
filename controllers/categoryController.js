const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const CategoryModel = require('../models/categoryModel');
const ApiError = require('../utils/apiError');

/****************************************
 * @desc     Get list of categories
 * @route    GET /api/v1/categories
 * @access   Public
 ****************************************/
const getCategories = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;

    const categories = await CategoryModel.find({}).skip(skip).limit(limit);

    res.status(200).json({
        result: categories.length,
        page,
        data: categories,
    });
});

/****************************************
 * @desc     Get specific category by ID
 * @route    GET /api/v1/categories/:idC
 * @access   Public
 ****************************************/
const getCategory = asyncHandler(async (req, res, next) => {
    const {idC} = req.params;
    const category = await CategoryModel.findById(idC);
    if (!category) {
        // res.status(404).json({msg: `No category for this ID: ${idC}`});
        return next(new ApiError(`No category for this ID: ${idC}`, 404));
    }
    res.status(200).json({
        data: category,
    });
});

/****************************************
 * @desc     Create category
 * @route    POST /api/v1/categories
 * @access   Private
 ****************************************/
const createCategory = asyncHandler(async (req, res) => {
    const {name} = req.body;

    const category = await CategoryModel.create({
        name,
        slug: slugify(name),
    });

    res.status(201).json({data: category});
});

/****************************************
 * @desc     Update specific category
 * @route    PUT /api/v1/categories/:idC
 * @access   Private
 ****************************************/
const updateCategory = asyncHandler(async (req, res, next) => {
    const {idC} = req.params;
    const {name} = req.body;
    const category = await CategoryModel.findOneAndUpdate({_id: idC}, {name, slug: slugify(name)}, {new: true});

    if (!category) {
        return next(new ApiError(`No category for this ID: ${idC}`, 404));
    }
    res.status(200).json({
        data: category,
    });
});

/****************************************
 * @desc     Delete specific category
 * @route    DELETE /api/v1/categories/:idC
 * @access   Private
 ****************************************/
const deleteCategory = asyncHandler(async (req, res, next) => {
    const {idC} = req.params;
    const category = await CategoryModel.findByIdAndDelete(idC);

    if (!category) {
        return next(new ApiError(`No category for this ID: ${idC}`, 404));
    }
    res.status(204).send();
});

module.exports = {
    getCategories,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory,
};
