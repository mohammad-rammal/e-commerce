const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, 'SubCategory required!'],
            unique: [true, 'SubCategory must be unique!'],
            minlength: [2, 'Must be more than 2 chars'],
            maxlength: [32, 'Must be less than 32 chars'],
        },
        slug: {
            type: String,
            lowercase: true,
        },
        category: {
            type: mongoose.Schema.ObjectId,
            ref: 'Category',
            required: [true, 'SubCategory must be belong to parent category'],
        },
    },
    {timestamps: true},
);

const SubCategoryModel = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategoryModel;
