const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please fill your name'],
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
        required: [true, 'Please provide your password'],
    },
    address: {
        type: String,
    },
    role: {
        type: String,
        enum: {
            values: ['guest', 'admin'],
            message: 'Roles are only: guest, admin',
        },
        default: 'guest',
    },
    cart: [
        {
            _id: false,
            numbers: {
                type: Number,
                default: 1,
            },
            item: {
                type: mongoose.Schema.ObjectId,
                ref: 'Toy',
            },
        },
    ],
    passwordResetToken: {
        type: String,
    },
    passwordResetTokenExpired: {
        type: Date,
    },
    passwordChangedAt: {
        type: Date,
    },
});

// middlewares
// hash password before save to db
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
    this.passwordChangedAt = Date.now() - 1000;

    next();
});

// function use to compare a password and user password
userSchema.methods.comparePassword = function (typePass, dbPass) {
    return bcrypt.compareSync(typePass, dbPass);
};

// function use to create reset password token
userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(4).toString('hex');

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // token only valid in 5 mins count from now
    this.passwordResetTokenExpired = Date.now() + 5 * 60 * 1000;

    return resetToken;
};

// function use to check if password has change after gen token,
userSchema.methods.changePasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

        // false = not change = the last time password change is before jwt generate
        return JWTTimestamp < changedTimestamp;
    }

    // False means NOT changed
    return false;
};
// create and export
const User = mongoose.model('User', userSchema);
module.exports = { User };
