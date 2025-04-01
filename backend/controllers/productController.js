const asyncHandler = require('express-async-handler');
const {v4: uuidv4} = require('uuid');
const sharp = require('sharp');

const ProductModel = require('../models/productModel');
const factory = require('./handlersFactory');
const {uploadMixOfImages} = require('../middlewares/uploadImageMiddleware');

exports.uploadProductImages = uploadMixOfImages([
    {name: 'imageCover', maxCount: 1},
    {name: 'images', maxCount: 5},
]);

exports.resizeProductImages = asyncHandler(async (req, res, next) => {
    if (req.files.imageCover) {
        const imageCoverFilename = `product-${uuidv4()}-${Date.now()}-cover.jpeg`;
        await sharp(req.files.imageCover[0].buffer)
            .resize(2000, 1333)
            .toFormat('jpeg')
            .jpeg({quality: 95})
            .toFile(`uploads/products/${imageCoverFilename}`);

        req.body.imageCover = imageCoverFilename;
    }

    if (req.files.images) {
        req.body.images = await Promise.all(
            req.files.images.map(async (img, index) => {
                const imageFilename = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;
                await sharp(img.buffer)
                    .resize(2000, 1333)
                    .toFormat('jpeg')
                    .jpeg({quality: 95})
                    .toFile(`uploads/products/${imageFilename}`);

                return imageFilename;
            }),
        );
    }

    next(); // Call next() once after all processing
});

/****************************************
 * @desc     Get list of products
 * @route    GET /api/v1/products
 * @access   Public
 ****************************************/
exports.getProducts = factory.getAll(ProductModel, 'Products');

/****************************************
 * @desc     Get specific product by ID
 * @route    GET /api/v1/products/:id
 * @access   Public
 ****************************************/
exports.getProduct = factory.getOne(ProductModel, 'reviews');

/****************************************
 * @desc     Create product
 * @route    POST /api/v1/products
 * @access   Private
 ****************************************/
exports.createProduct = factory.createOne(ProductModel);

/****************************************
 * @desc     Update specific product
 * @route    PUT /api/v1/products/:id
 * @access   Private
 ****************************************/
exports.updateProduct = factory.updateOne(ProductModel);

/****************************************
 * @desc     Delete specific product
 * @route    DELETE /api/v1/products/:id
 * @access   Private
 ****************************************/
exports.deleteProduct = factory.deleteOne(ProductModel);
