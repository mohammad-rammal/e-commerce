const ProductModel = require('../models/productModel');
const factory = require('./handlersFactory');

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
};
