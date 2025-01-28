const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ProductModel = require('../models/productModel');
const ApiError = require('../utils/apiError');

/****************************************
 * @desc     Get list of products
 * @route    GET /api/v1/products
 * @access   Public
 ****************************************/
const getProducts = asyncHandler(async (req, res) => {
    // 1- Filtering
    const queryStringObj = {...req.query};
    const excludesFields = ['page', 'sort', 'limit', 'field'];
    excludesFields.forEach((field) => delete queryStringObj[field]);

    // console.log(req.query);
    // console.log(queryStringObj);

    // Apply filtration
    let queryStr = JSON.stringify(queryStringObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // console.log(queryStringObj);
    // console.log(JSON.parse(queryStr));

    // 2- Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;

    // Build query
    const mongooseQuery = ProductModel.find(JSON.parse(queryStr))
        // price: req.query.price,
        // ratingsAverage: req.query.ratingsAverage,
        .skip(skip)
        .limit(limit)
        .populate({path: 'category', select: 'name'});
    // .where('price').equals(req.query.price)

    // Execute query
    const products = await mongooseQuery;

    res.status(200).json({
        result: products.length,
        page,
        data: products,
    });
});

/****************************************
 * @desc     Get specific product by ID
 * @route    GET /api/v1/products/:idP
 * @access   Public
 ****************************************/
const getProduct = asyncHandler(async (req, res, next) => {
    const {idP} = req.params;
    const product = await ProductModel.find({}).populate({path: 'category', select: 'name -_id'});
    if (!product) {
        return next(new ApiError(`No product for this ID: ${idP}`, 404));
    }
    res.status(200).json({
        data: product,
    });
});

/****************************************
 * @desc     Create product
 * @route    POST /api/v1/products
 * @access   Private
 ****************************************/
const createProduct = asyncHandler(async (req, res) => {
    req.body.slug = slugify(req.body.title);

    const product = await ProductModel.create(req.body);

    res.status(201).json({data: product});
});

/****************************************
 * @desc     Update specific product
 * @route    PUT /api/v1/products/:idP
 * @access   Private
 ****************************************/
const updateProduct = asyncHandler(async (req, res, next) => {
    const {idP} = req.params;

    if (req.body.title) {
        req.body.slug = slugify(req.body.title);
    }

    const product = await ProductModel.findOneAndUpdate({_id: idP}, req.body, {new: true});

    if (!product) {
        return next(new ApiError(`No product for this ID: ${idP}`, 404));
    }
    res.status(200).json({
        data: product,
    });
});

/****************************************
 * @desc     Delete specific product
 * @route    DELETE /api/v1/products/:idP
 * @access   Private
 ****************************************/
const deleteProduct = asyncHandler(async (req, res, next) => {
    const {idP} = req.params;
    const product = await ProductModel.findByIdAndDelete(idP);

    if (!product) {
        return next(new ApiError(`No product for this ID: ${idP}`, 404));
    }
    res.status(204).send();
});

module.exports = {
    getProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
};
