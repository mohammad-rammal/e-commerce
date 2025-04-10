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
        subCategories: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'SubCategory',
            },
        ],
        brand: {
            type: mongoose.Schema.ObjectId,
            ref: 'brand',
        },
        ratingsAverage: {
            type: Number,
            min: [1, 'Rating must be above or equal 1.0'],
            max: [5, 'Rating must be below or equal 5.0'],
        },
        ratingsQuantity: {
            type: Number,
            default: 0,
        },
        // We will make Virtual Populate
        // reviewsField: [
        //     {
        //         type: mongoose.Schema.ObjectId,
        //         ref: 'Review',
        //     },
        // ],
    },

    {
        timestamps: true,
        toJSON: {virtuals: true},
        toObject: {virtuals: true},
    },
);

// virtual populate
productSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'product',
    localField: '_id',
});

//* mongoose query middleware (show name of category instead of id)
// productSchema.pre(/^find/, function (next) {
//     this.populate({
//         path: 'category',
//         select: 'name -_id',
//     });
//     next();
// });

// return image base url + image name
const setImageURL = (doc) => {
    if (doc.imageCover) {
        const imageUrl = `${process.env.BASE_URL}/products/${doc.imageCover}`;
        doc.imageCover = imageUrl;
    }
    if (doc.images) {
        const imagesList = [];
        doc.images.forEach((image) => {
            const imageUrl = `${process.env.BASE_URL}/products/${image}`;
            imagesList.push(imageUrl);
        });
        doc.images = imagesList;
    }
};

// Create
productSchema.post('save', (doc) => {
    setImageURL(doc);
});

// FindOne,FindAll, Update
productSchema.post('init', (doc) => {
    setImageURL(doc);
});

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
