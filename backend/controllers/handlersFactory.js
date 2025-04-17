const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const ApiFeatures = require('../utils/apiFeatures');

exports.deleteOne = (ModelName) =>
    asyncHandler(async (req, res, next) => {
        const {id} = req.params;
        const document = await ModelName.findByIdAndDelete(id);

        if (!document) {
            return next(new ApiError(`No document for this ID: ${id}`, 404));
        }

        // (For Aggregation) Trigger "remove" event when update document
        if (document.product) {
            await document.constructor.calcAverageRatingsAndQuantity(document.product);
        }

        res.status(204).send();
    });

exports.updateOne = (ModelName) =>
    asyncHandler(async (req, res, next) => {
        const document = await ModelName.findByIdAndUpdate(req.params.id, req.body, {new: true});

        if (!document) {
            return next(new ApiError(`No document for this ID: ${req.params.id}`, 404));
        }

        // (For Aggregation) Trigger "save" event when update document
        document.save();

        res.status(200).json({
            data: document,
        });
    });

exports.createOne = (ModelName) =>
    asyncHandler(async (req, res) => {
        const document = await ModelName.create(req.body);

        res.status(201).json({data: document});
    });

exports.getOne = (ModelName, populationOption) =>
    asyncHandler(async (req, res, next) => {
        const {id} = req.params;

        // 1- Build query
        let query = ModelName.findById(id);
        if (populationOption) {
            query = query.populate(populationOption);
        }

        // 2- Execute query
        const document = await query;
        if (!document) {
            // res.status(404).json({msg: `No document for this ID: ${id}`});
            return next(new ApiError(`No document for this ID: ${id}`, 404));
        }
        res.status(200).json({
            data: document,
        });
    });

exports.getAll = (ModelName, nameOfModel = '') =>
    asyncHandler(async (req, res) => {
        let filter = {};
        if (req.filterObject) {
            filter = req.filterObject;
        }

        // Apply filter/search BEFORE pagination to count matched documents
        let features = new ApiFeatures(ModelName.find(filter), req.query).filter().search(nameOfModel);

        const filteredDocs = await features.mongooseQuery;
        const totalResults = filteredDocs.length;

        // Re-initialize query for pagination
        features = new ApiFeatures(ModelName.find(filter), req.query)
            .filter()
            .search(nameOfModel)
            .pagination(totalResults)
            .limit()
            .sort();

        const {mongooseQuery, paginationResult} = features;
        const documents = await mongooseQuery;

        res.status(200).json({
            result: documents.length,
            totalResults, // Show total regardless of pagination
            paginationResult,
            data: documents,
        });
    });
