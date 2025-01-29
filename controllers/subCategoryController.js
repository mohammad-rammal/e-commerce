const SubCategoryModel = require('../models/subCategoryModel');
const factory = require('./handlersFactory');

const setCategoryIdToBody = (req, res, next) => {
    // Nested Route (create)
    if (!req.body.category) {
        req.body.category = req.params.categoryId;
    }
    next();
};

const createFilterObject = (req, res, next) => {
    // Nested Route (get)
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
const getSubCategories = factory.getAll(SubCategoryModel);

// const getSubCategories = asyncHandler(async (req, res) => {
//     const documentsCounts = await SubCategoryModel.countDocuments();
//     const apiFeatures = new ApiFeatures(SubCategoryModel.find(), req.query)
//         .pagination(documentsCounts)
//         .filter()
//         .search()
//         .limit()
//         .sort();

//     const {mongooseQuery, paginationResult} = apiFeatures;
//     const subCategories = await mongooseQuery;

//     // const page = req.query.page * 1 || 1;
//     // const limit = req.query.limit * 1 || 5;
//     // const skip = (page - 1) * limit;
//     // // console.log(req.params);

//     // const subCategories = await SubCategoryModel.find(req.filterObj).skip(skip).limit(limit).populate('category');
//     res.status(200).json({
//         result: subCategories.length,
//         paginationResult,
//         data: subCategories,
//     });
// });

/****************************************
 * @desc     Get list of subCategories (Nested Route)
 * @route    GET /api/v1/categories/:categoryId/subCategories
 * @access   Public
 ****************************************/

/****************************************
 * @desc     Get specific subCategory by ID
 * @route    GET /api/v1/subCategories/:id
 * @access   Public
 ****************************************/
const getSubCategory = factory.getOne(SubCategoryModel);

// const getSubCategory = asyncHandler(async (req, res, next) => {
//     const {id} = req.params;
//     const subCategory = await SubCategoryModel.findById(id).populate({path: 'category', select: 'name -_id'});
//     if (!subCategory) {
//         // res.status(404).json({msg: `No subCategory for this ID: ${id}`});
//         return next(new ApiError(`No subCategory for this ID: ${id}`, 404));
//     }
//     res.status(200).json({
//         data: subCategory,
//     });
// });
/****************************************
 * @desc     Create subCategory
 * @route    POST /api/v1/subcategories
 * @access   Private
 ****************************************/
const createSubCategory = factory.createOne(SubCategoryModel);

// const createSubCategory = asyncHandler(async (req, res) => {
//     const {name, category} = req.body;

//     const subCategory = await SubCategoryModel.create({
//         name,
//         slug: slugify(name),
//         category,
//     });

//     res.status(201).json({data: subCategory});
// });

/****************************************
 * @desc     Update specific subCategory
 * @route    PUT /api/v1/subCategories/:id
 * @access   Private
 ****************************************/
const updateSubCategory = factory.updateOne(SubCategoryModel);

// const updateSubCategory = asyncHandler(async (req, res, next) => {
//     const {id} = req.params;
//     const {name, category} = req.body;
//     const subCategory = await SubCategoryModel.findOneAndUpdate(
//         {_id: id},
//         {name, slug: slugify(name), category},
//         {new: true},
//     );

//     if (!subCategory) {
//         return next(new ApiError(`No subCategory for this ID: ${id}`, 404));
//     }
//     res.status(200).json({
//         data: subCategory,
//     });
// });

/****************************************
 * @desc     Delete specific sub category
 * @route    DELETE /api/v1/subCategories/:id
 * @access   Private
 ****************************************/
const deleteSubCategory = factory.deleteOne(SubCategoryModel);
// const deleteSubCategory = asyncHandler(async (req, res, next) => {
//     const {id} = req.params;
//     const subCategory = await SubCategoryModel.findByIdAndDelete(id);

//     if (!subCategory) {
//         return next(new ApiError(`No subCategory for this ID: ${id}`, 404));
//     }
//     res.status(204).send();
// });

module.exports = {
    createSubCategory,
    getSubCategory,
    getSubCategories,
    updateSubCategory,
    deleteSubCategory,
    setCategoryIdToBody,
    createFilterObject,
};
