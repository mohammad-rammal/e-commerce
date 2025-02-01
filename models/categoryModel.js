const mongoose = require('mongoose');

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

// return image base url + image name
const setImageURL = (doc) => {
    if (doc.image) {
        const imageUrl = `${process.env.BASE_URL}/categories/${doc.image}`;
        doc.image = imageUrl;
    }
};

// Create
categorySchema.post('save', (doc) => {
    setImageURL(doc);
});

// FindOne,FindAll, Update
categorySchema.post('init', (doc) => {
    setImageURL(doc);
});

const CategoryModel = mongoose.model('Category', categorySchema);
// categorySchema.pre('save', function (next) {
//     console.log(this);
//     this.slug = slugify(this.name, {lower: true});
//     next();
// });

module.exports = CategoryModel;
