const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, 'name required!'],
        },
        slug: {
            type: String,
            lowercase: true,
        },
        email: {
            type: String,
            required: [true, 'email required!'],
            unique: true,
            lowercase: true,
        },
        phone: String,
        profileImg: String,
        password: {
            type: String,
            required: [true, 'password required!'],
            minlength: [6, 'Too short password!'],
        },
        passwordChangedAt: Date,
        passwordResetCode: String,
        passwordResetExpires: Date,
        passwordResetVerified: Boolean,
        role: {
            type: String,
            enum: ['user', 'manager', 'admin'],
            default: 'user',
            // select: false,
        },
        active: {
            type: Boolean,
            default: true,
        },
        // array of products
        // child reference (one to many)
        wishlist: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'Product',
            },
        ],

        // Embedded Document: for limited or small data
        addresses: [
            {
                id: {type: mongoose.Schema.Types.ObjectId},
                alias: String,
                details: String,
                phone: String,
                city: String,
                postalCode: Number,
            },
        ],
    },
    {timestamps: true},
);

// Before save the user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    // Hashing password user
    this.password = await bcrypt.hash(this.password, 12);

    next();
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
