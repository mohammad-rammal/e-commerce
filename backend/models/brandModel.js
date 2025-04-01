const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Brand required!'],
            unique: [true, 'Brand must be unique!'],
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
        const imageUrl = `${process.env.BASE_URL}/brands/${doc.image}`;
        doc.image = imageUrl;
    }
};

// Create
brandSchema.post('save', (doc) => {
    setImageURL(doc);
});

// FindOne,FindAll, Update
brandSchema.post('init', (doc) => {
    setImageURL(doc);
});

const BrandModel = mongoose.model('Brand', brandSchema);

module.exports = BrandModel;
