const asyncHandler = require('express-async-handler');
const {v4: uuidv4} = require('uuid');
const sharp = require('sharp');

const {uploadSingleImage} = require('../middlewares/uploadImageMiddleware');
const BrandModel = require('../models/brandModel');
const factory = require('./handlersFactory');

const uploadBrandImage = uploadSingleImage('image');

// Image processing
const resizeImage = asyncHandler(async (req, res, next) => {
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
const getBrands = factory.getAll(BrandModel);

// const getBrands = asyncHandler(async (req, res) => {
//     // Build query
//     const documentsCounts = await BrandModel.countDocuments();
//     const apiFeatures = new ApiFeatures(BrandModel.find(), req.query)
//         .pagination(documentsCounts)
//         .filter()
//         .search()
//         .limit()
//         .sort();

//     const {mongooseQuery, paginationResult} = apiFeatures;
//     const brands = await mongooseQuery;

//     // const page = req.query.page * 1 || 1;
//     // const limit = req.query.limit * 1 || 5;
//     // const skip = (page - 1) * limit;

//     // const brands = await BrandModel.find({}).skip(skip).limit(limit);

//     res.status(200).json({
//         result: brands.length,
//         paginationResult,
//         data: brands,
//     });
// });
/****************************************
 * @desc     Get specific brand by ID
 * @route    GET /api/v1/brands/:id
 * @access   Public
 ****************************************/
const getBrand = factory.getOne(BrandModel);
// const getBrand = asyncHandler(async (req, res, next) => {
//     const {id} = req.params;
//     const brand = await BrandModel.findById(id);
//     if (!brand) {
//         // res.status(404).json({msg: `No brand for this ID: ${id}`});
//         return next(new ApiError(`No brand for this ID: ${id}`, 404));
//     }
//     res.status(200).json({
//         data: brand,
//     });
// });
/****************************************
 * @desc     Create brand
 * @route    POST /api/v1/brands
 * @access   Private
 ****************************************/
const createBrand = factory.createOne(BrandModel);

// const createBrand = asyncHandler(async (req, res) => {
//     const {name} = req.body;

//     const brand = await BrandModel.create({
//         name,
//         slug: slugify(name),
//     });

//     res.status(201).json({data: brand});
// });

// // Middleware to apply slugify to brand name and put it in Brand Router
// exports.applySlugify = (req, res, next) => {
//     req.body.slug = slugify(req.body.name);
//     next();
// };

/****************************************
 * @desc     Update specific brand
 * @route    PUT /api/v1/brands/:id
 * @access   Private
 ****************************************/
const updateBrand = factory.updateOne(BrandModel);
// const updateBrand = asyncHandler(async (req, res, next) => {
//     const {id} = req.params;
//     const {name} = req.body;
//     const brand = await BrandModel.findOneAndUpdate({_id: id}, {name, slug: slugify(name)}, {new: true});

//     if (!brand) {
//         return next(new ApiError(`No brand for this ID: ${id}`, 404));
//     }
//     res.status(200).json({
//         data: brand,
//     });
// });

/****************************************
 * @desc     Delete specific brand
 * @route    DELETE /api/v1/brands/:id
 * @access   Private
 ****************************************/
const deleteBrand = factory.deleteOne(BrandModel);
// const deleteBrand = asyncHandler(async (req, res, next) => {
//     const {id} = req.params;
//     const brand = await BrandModel.findByIdAndDelete(id);

//     if (!brand) {
//         return next(new ApiError(`No brand for this ID: ${id}`, 404));
//     }
//     res.status(204).send();
// });

module.exports = {
    getBrands,
    createBrand,
    getBrand,
    updateBrand,
    deleteBrand,
    uploadBrandImage,
    resizeImage,
};
