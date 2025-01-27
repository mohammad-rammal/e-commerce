const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title required!'],
            trim: true,
            unique: [true, 'Title must be unique!'],
            minlength: [3, 'Too short product title'],
            maxlength: [100, 'Too long product title'],
        },
        slug: {
            type: String,
            required: true,
            lowercase: true,
        },
        description: {
            type: String,
            required: [true, 'Product description is required!'],
            trim: true,
            minlength: [20, 'Too short description'],
            maxlength: [2000, 'Too long description'],
        },
        quantity: {
            type: Number,
            required: [true, 'Product quantity is required!'],
        },
        solid: {
            type: Number,
            default: 0,
        },
        price: {
            type: Number,
            required: [true, 'Product price is required!'],
            trim: true,
            max: [200000, 'Too long product price'],
        },
        priceAfterDiscount: {
            type: Number,
        },
        colors: [String],
        imageCover: {
            type: String,
            required: [true, 'Product image cover is required!'],
        },
        images: [String],
        category: {
            type: mongoose.Schema.ObjectId,
            ref: 'Category',
            required: [true, 'Product must be belong to category!'],
        },
        subCategory: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'SubCategory',
            },
        ],
        brand: {
            type: mongoose.Schema.ObjectId,
            ref: 'brand',
        },
        ratingsAvg: {
            type: Number,
            min: [1, 'Rating must be above or equal 1.0'],
            max: [5, 'Rating must be below or equal 5.0'],
        },
        ratingsQuantity: {
            type: Number,
            default: 0,
        },
    },

    {timestamps: true},
);

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
