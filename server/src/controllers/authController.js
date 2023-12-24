const { User } = require('../models/userModel');
const { CustomError } = require('../utils/CustomError');
const jwt = require('jsonwebtoken');
const { filterObject } = require('../utils/filterObject');
const Email = require('../utils/email/Email');
const crypto = require('crypto');

const changePassword = async (req, res, next) => {
    try {
        const thisUser = req.user;

        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword)
            return next(new CustomError('Please fill old & new password', 400));

        if (!thisUser.comparePassword(oldPassword, thisUser.password))
            return next(new CustomError('Your old password is incorrect'));

        thisUser.password = newPassword;
        await thisUser.save({ validateBeforeSave: false });

        res.status(200).send({
            status: 'ok',
            message: 'Change password successfully',
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
};

const createAndSendToken = (user, statusCode, res) => {
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES,
    });

    const expireDay = process.env.JWT_COOKIE_EXPIRES * 1;
    const cookieOptions = {
        expires: new Date(Date.now() + expireDay * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };

    //
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwt', jwtToken, cookieOptions);

    const filterUser = filterObject(
        user.toObject(),
        'name',
        'role',
        'email',
        '_id',
        'address',
        'phone'
    );
    res.status(statusCode).send({
        status: 'ok',
        accessToken: jwtToken,
        user: filterUser,
    });
};

const register = async (req, res, next) => {
    try {
        const { name, email, password, phone } = req.body;
        const newUser = new User({
            name,
            email,
            password,
            phone,
        });
        await newUser.save();

        createAndSendToken(newUser, 201, res);
    } catch (error) {
        console.log(error);
        return next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return next(new CustomError('Please fill email & password', 400));

        const loginUser = await User.findOne({ email });
        if (!loginUser || !loginUser.comparePassword(password, loginUser.password)) {
            return next(new CustomError('Email or password is incorrect', 401));
        }

        // if pass all, successfully login and send token to client
        createAndSendToken(loginUser, 200, res);
    } catch (error) {
        console.log(error);
        return next(error);
    }
};

const logout = (req, res, next) => {
    res.cookie('jwt', 'logout', {
        expires: new Date(Date.now() + 10 * 1000),
    });

    res.status(200).send({
        status: 'ok',
    });
};

const forgetPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email)
            return next(
                new CustomError('Please provide your email to receive reset code', 400)
            );
        const thisUser = await User.findOne({ email });
        if (!thisUser) return next(new CustomError('This user is not exist!', 404));

        const resetPasswordToken = thisUser.createPasswordResetToken();

        const x = 5;
        await thisUser.save({ validateBeforeSave: false });
        try {
            const emailInstance = new Email(thisUser);
            await emailInstance.sendResetPasswordMail(resetPasswordToken);

            res.status(200).send({
                status: 'ok',
                message: 'Reset password code has been sent, please check your email!',
                userId: thisUser._id,
            });
        } catch (error) {
            thisUser.passwordResetToken = undefined;
            thisUser.passwordResetTokenExpired = undefined;
            await thisUser.save({ validateBeforeSave: false });

            return next(
                new CustomError('Error occurs when sending email, please try again', 500)
            );
        }
    } catch (error) {
        console.log(error);
        return next(error);
    }
};
const resetPassword = async (req, res, next) => {
    try {
        const { newPassword, resetToken } = req.body;
        if (!newPassword || !resetToken)
            return next(
                new CustomError('Please provide your new password and reset code', 400)
            );

        const hashToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        const thisUser = await User.findById(req.params.id);
        if (!thisUser) return next(new CustomError('This user is not exist!', 404));
        if (
            !thisUser.passwordResetToken ||
            thisUser.passwordResetTokenExpired < Date.now() ||
            thisUser.passwordResetToken !== hashToken
        )
            return next(new CustomError('This reset token is invalid or expired!', 400));

        thisUser.passwordResetToken = undefined;
        thisUser.passwordResetTokenExpired = undefined;
        thisUser.password = newPassword;

        await thisUser.save({ validateBeforeSave: false });

        res.status(200).send({
            status: 'ok',
            message: 'Your new password was applied!',
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
};

module.exports = {
    register,
    login,
    logout,
    forgetPassword,
    resetPassword,
    changePassword,
};
