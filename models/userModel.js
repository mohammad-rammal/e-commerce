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
        role: {
            type: String,
            enum: ['user', 'manager', 'admin'],
            default: 'user',
        },
        active: {
            type: Boolean,
            default: true,
        },
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
