const asyncHandler = require('express-async-handler');
const {v4: uuidv4} = require('uuid');
const sharp = require('sharp');

const ProductModel = require('../models/productModel');
const factory = require('./handlersFactory');
const {uploadMixOfImages} = require('../middlewares/uploadImageMiddleware');

// const multerStorage = multer.memoryStorage();

// const multerFilter = function (req, file, cb) {
//     // mimetype: image.jpeg
//     if (file.mimetype.startsWith('image')) {
//         cb(null, true);
//     } else {
//         cb(new ApiError('Not an image! Please upload only images.', 400), false);
//     }
// };

// const upload = multer({storage: multerStorage, fileFilter: multerFilter});

const uploadProductImages = uploadMixOfImages([
    {name: 'imageCover', maxCount: 1},
    {name: 'images', maxCount: 5},
]);

const resizeProductImages = asyncHandler(async (req, res, next) => {
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
const getProducts = factory.getAll(ProductModel, 'Products');

// const getProducts = asyncHandler(async (req, res) => {
//     // Build query
//     const documentsCounts = await ProductModel.countDocuments();
//     const apiFeatures = new ApiFeatures(ProductModel.find(), req.query)
//         .pagination(documentsCounts)
//         .filter()
//         .search('Products')
//         .limit()
//         .sort();

//     // Pagination result

//     // Execute query
//     const {mongooseQuery, paginationResult} = apiFeatures;
//     const products = await mongooseQuery;

//     res.status(200).json({
//         result: products.length,
//         paginationResult,
//         data: products,
//     });
// });

/****************************************
 * @desc     Get specific product by ID
 * @route    GET /api/v1/products/:id
 * @access   Public
 ****************************************/
const getProduct = factory.getOne(ProductModel);

// const getProduct = asyncHandler(async (req, res, next) => {
//     const {id} = req.params;
//     const product = await ProductModel.find({}).populate({path: 'category', select: 'name -_id'});
//     if (!product) {
//         return next(new ApiError(`No product for this ID: ${id}`, 404));
//     }
//     res.status(200).json({
//         data: product,
//     });
// });

/****************************************
 * @desc     Create product
 * @route    POST /api/v1/products
 * @access   Private
 ****************************************/
const createProduct = factory.createOne(ProductModel);

// const createProduct = asyncHandler(async (req, res) => {
//     req.body.slug = slugify(req.body.title);

//     const product = await ProductModel.create(req.body);

//     res.status(201).json({data: product});
// });

/****************************************
 * @desc     Update specific product
 * @route    PUT /api/v1/products/:id
 * @access   Private
 ****************************************/
const updateProduct = factory.updateOne(ProductModel);

// const updateProduct = asyncHandler(async (req, res, next) => {
//     const {id} = req.params;

//     if (req.body.title) {
//         req.body.slug = slugify(req.body.title);
//     }

//     const product = await ProductModel.findOneAndUpdate({_id: id}, req.body, {new: true});

//     if (!product) {
//         return next(new ApiError(`No product for this ID: ${id}`, 404));
//     }
//     res.status(200).json({
//         data: product,
//     });
// });

/****************************************
 * @desc     Delete specific product
 * @route    DELETE /api/v1/products/:id
 * @access   Private
 ****************************************/
const deleteProduct = factory.deleteOne(ProductModel);
// const deleteProduct = asyncHandler(async (req, res, next) => {
//     const {id} = req.params;
//     const product = await ProductModel.findByIdAndDelete(id);

//     if (!product) {
//         return next(new ApiError(`No product for this ID: ${id}`, 404));
//     }
//     res.status(204).send();
// });

module.exports = {
    getProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    uploadProductImages,
    resizeProductImages,
};
