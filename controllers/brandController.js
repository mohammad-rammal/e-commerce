const asyncHandler = require('express-async-handler');
const {v4: uuidv4} = require('uuid');
const sharp = require('sharp');

const {uploadSingleImage} = require('../middlewares/uploadImageMiddleware');
const BrandModel = require('../models/brandModel');
const factory = require('./handlersFactory');

exports.uploadBrandImage = uploadSingleImage('image');

// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
    const filename = `brand-${uuidv4()}-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
        .resize(600, 600)
        .toFormat('jpeg')
        .jpeg({quality: 95})
        .toFile(`uploads/brands/${filename}`);

    // Save image into DB
    req.body.image = filename;

    next();
});

/****************************************
 * @desc     Get list of brands
 * @route    GET /api/v1/brands
 * @access   Public
 ****************************************/
exports.getBrands = factory.getAll(BrandModel);

/****************************************
 * @desc     Get specific brand by ID
 * @route    GET /api/v1/brands/:id
 * @access   Public
 ****************************************/
exports.getBrand = factory.getOne(BrandModel);

/****************************************
 * @desc     Create brand
 * @route    POST /api/v1/brands
 * @access   Private
 ****************************************/
exports.createBrand = factory.createOne(BrandModel);

/****************************************
 * @desc     Update specific brand
 * @route    PUT /api/v1/brands/:id
 * @access   Private
 ****************************************/
exports.updateBrand = factory.updateOne(BrandModel);

/****************************************
 * @desc     Delete specific brand
 * @route    DELETE /api/v1/brands/:id
 * @access   Private
 ****************************************/
exports.deleteBrand = factory.deleteOne(BrandModel);
