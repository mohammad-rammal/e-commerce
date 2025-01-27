const mongoose = require('mongoose');
const slugify = require('slugify');

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Category required!'],
            unique: [true, 'Category must be unique!'],
            minlength: [2, 'Must be more than 2 chars'],
            maxlength: [30, 'Must be less than 30 chars'],
        },
        slug: {
            type: String,
            lowercase: true,
        },
        image: String,
    },
    {timestamps: true},
);

const CategoryModel = mongoose.model('Category', categorySchema);

// categorySchema.pre('save', function (next) {
//     console.log(this);
//     this.slug = slugify(this.name, {lower: true});
//     next();
// });

module.exports = CategoryModel;
