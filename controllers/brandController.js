const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const BrandModel = require('../models/brandModel');
const ApiError = require('../utils/apiError');

/****************************************
 * @desc     Get list of brands
 * @route    GET /api/v1/brands
 * @access   Public
 ****************************************/
const getBrands = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;

    const brands = await BrandModel.find({}).skip(skip).limit(limit);

    res.status(200).json({
        result: brands.length,
        page,
        data: brands,
    });
});

/****************************************
 * @desc     Get specific brand by ID
 * @route    GET /api/v1/brands/:idC
 * @access   Public
 ****************************************/
const getBrand = asyncHandler(async (req, res, next) => {
    const {idC} = req.params;
    const brand = await BrandModel.findById(idC);
    if (!brand) {
        // res.status(404).json({msg: `No brand for this ID: ${idC}`});
        return next(new ApiError(`No brand for this ID: ${idC}`, 404));
    }
    res.status(200).json({
        data: brand,
    });
});

/****************************************
 * @desc     Create brand
 * @route    POST /api/v1/brands
 * @access   Private
 ****************************************/
const createBrand = asyncHandler(async (req, res) => {
    const {name} = req.body;

    const brand = await BrandModel.create({
        name,
        slug: slugify(name),
    });

    res.status(201).json({data: brand});
});

/****************************************
 * @desc     Update specific brand
 * @route    PUT /api/v1/brands/:idC
 * @access   Private
 ****************************************/
const updateBrand = asyncHandler(async (req, res, next) => {
    const {idC} = req.params;
    const {name} = req.body;
    const brand = await BrandModel.findOneAndUpdate({_id: idC}, {name, slug: slugify(name)}, {new: true});

    if (!brand) {
        return next(new ApiError(`No brand for this ID: ${idC}`, 404));
    }
    res.status(200).json({
        data: brand,
    });
});

/****************************************
 * @desc     Delete specific brand
 * @route    DELETE /api/v1/brands/:idC
 * @access   Private
 ****************************************/
const deleteBrand = asyncHandler(async (req, res, next) => {
    const {idC} = req.params;
    const brand = await BrandModel.findByIdAndDelete(idC);

    if (!brand) {
        return next(new ApiError(`No brand for this ID: ${idC}`, 404));
    }
    res.status(204).send();
});

module.exports = {
    getBrands,
    createBrand,
    getBrand,
    updateBrand,
    deleteBrand,
};
