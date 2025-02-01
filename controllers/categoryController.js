const sharp = require('sharp');

const {v4: uuidv4} = require('uuid');
const asyncHandler = require('express-async-handler');
const CategoryModel = require('../models/categoryModel');
const factory = require('./handlersFactory');
const {uploadSingleImage} = require('../middlewares/uploadImageMiddleware');

// // 1- DiskStorage engine will not return buffer (for not image processing)
// // const multerStorage = multer.diskStorage({
// //     destination: function (req, file, cb) {
// //         cb(null, 'uploads/categories');
// //     },
// //     filename: function (req, file, cb) {
// //         // filename = category-${id}-Date.now().jpeg
// //         const ext = file.mimetype.split('/')[1];
// //         const filename = `category-${uuidv4()}-${Date.now()}.${ext}`;
// //         cb(null, filename);
// //     },
// // });

// // 2- Memory storage engine will return buffer (for image processing)
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
// // const upload = multer({dest: 'uploads/categories'});

const uploadCategoryImage = uploadSingleImage('image');

const resizeImage = asyncHandler(async (req, res, next) => {
    const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
        .resize(600, 600)
        .toFormat('jpeg')
        .jpeg({quality: 90})
        .toFile(`uploads/categories/${filename}`);

    // Save image into DB
    req.body.image = filename;

    next();
});

/****************************************
 * @desc     Get list of categories
 * @route    GET /api/v1/categories
 * @access   Public
 ****************************************/
const getCategories = factory.getAll(CategoryModel);

// const getCategories = asyncHandler(async (req, res) => {
//     const documentsCounts = await CategoryModel.countDocuments();
//     const apiFeatures = new ApiFeatures(CategoryModel.find(), req.query)
//         .pagination(documentsCounts)
//         .filter()
//         .search()
//         .limit()
//         .sort();

//     const {mongooseQuery, paginationResult} = apiFeatures;
//     const categories = await mongooseQuery;

//     // const page = req.query.page * 1 || 1;
//     // const limit = req.query.limit * 1 || 5;
//     // const skip = (page - 1) * limit;

//     // const categories = await CategoryModel.find({}).skip(skip).limit(limit);
//     res.status(200).json({
//         result: categories.length,
//         paginationResult,
//         data: categories,
//     });
// });

/****************************************
 * @desc     Get specific category by ID
 * @route    GET /api/v1/categories/:id
 * @access   Public
 ****************************************/
const getCategory = factory.getOne(CategoryModel);

// const getCategory = asyncHandler(async (req, res, next) => {
//     const {id} = req.params;
//     const category = await CategoryModel.findById(id);
//     if (!category) {
//         // res.status(404).json({msg: `No category for this ID: ${id}`});
//         return next(new ApiError(`No category for this ID: ${id}`, 404));
//     }
//     res.status(200).json({
//         data: category,
//     });
// });
/****************************************
 * @desc     Create category
 * @route    POST /api/v1/categories
 * @access   Private
 ****************************************/
const createCategory = factory.createOne(CategoryModel);

// const createCategory = asyncHandler(async (req, res) => {
//     const {name} = req.body;

//     const category = await CategoryModel.create({
//         name,
//         slug: slugify(name),
//     });

//     res.status(201).json({data: category});
// });

/****************************************
 * @desc     Update specific category
 * @route    PUT /api/v1/categories/:id
 * @access   Private
 ****************************************/
const updateCategory = factory.updateOne(CategoryModel);
// const updateCategory = asyncHandler(async (req, res, next) => {
//     const {id} = req.params;
//     const {name} = req.body;
//     const category = await CategoryModel.findOneAndUpdate({_id: id}, {name, slug: slugify(name)}, {new: true});

//     if (!category) {
//         return next(new ApiError(`No category for this ID: ${id}`, 404));
//     }
//     res.status(200).json({
//         data: category,
//     });
// });

/****************************************
 * @desc     Delete specific category
 * @route    DELETE /api/v1/categories/:id
 * @access   Private
 ****************************************/
const deleteCategory = factory.deleteOne(CategoryModel);
// const deleteCategory = asyncHandler(async (req, res, next) => {
//     const {id} = req.params;
//     const category = await CategoryModel.findByIdAndDelete(id);

//     if (!category) {
//         return next(new ApiError(`No category for this ID: ${id}`, 404));
//     }
//     res.status(204).send();
// });

module.exports = {
    getCategories,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory,
    uploadCategoryImage,
    resizeImage,
};
