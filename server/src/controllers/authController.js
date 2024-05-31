const { User } = require('../models/userModel');
const { CustomError } = require('../utils/CustomError');
const Email = require('../utils/email/Email');
const crypto = require('crypto');
const { signAccessToken, signRefreshToken } = require('../utils/auth/jwtHelper');
const { filterExcludeObject } = require('../utils/helper');

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
        return next(error);
    }
};

const createAndSendToken = (user, res, isRemember) => {
    // create and send token
    const accessToken = signAccessToken({
        _id: user._id,
        role: user.role,
        email: user.email,
        name: user.name,
        isRemember,
    });
    const refreshToken = signRefreshToken({
        _id: user._id,
        isRemember: isRemember ? true : false,
    });

    // save cookie, if user choose not remember set expired of cookie is SESSION
    const cookieExpired = isRemember
        ? new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000)
        : null;
    const ATCookieOptions = {
        expires: cookieExpired,
        httpOnly: true,
    };
    const RTCookieOptions = {
        expires: cookieExpired,
        httpOnly: true,
        path: '/api/user/refreshtoken',
    };
    if (process.env.NODE_ENV === 'production') {
        ATCookieOptions.secure = true;
        RTCookieOptions.secure = true;
    }
    res.cookie('accessToken', accessToken, ATCookieOptions);
    res.cookie('refreshToken', refreshToken, RTCookieOptions);

    const filterUser = filterExcludeObject(
        user.toObject(),
        'password',
        'passwordChangedAt'
    );

    res.status(200).send({
        status: 'ok',
        data: {
            user: filterUser,
            accessToken,
            refreshToken,
        },
    });
};

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const checkIsExist = await User.findOne({ email }).lean();
        if (checkIsExist)
            return next(new CustomError('This email is already register!', 400));
        const newUser = new User({
            name,
            email,
            password,
        });
        await newUser.save();

        createAndSendToken(newUser, res, false);
    } catch (error) {
        return next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password, isRemember } = req.body;

        if (!email || !password)
            return next(new CustomError('Please fill email & password', 400));

        const loginUser = await User.findOne({ email });
        if (!loginUser || !loginUser.comparePassword(password, loginUser.password)) {
            return next(new CustomError('Email or password is incorrect', 401));
        }

        // if pass all, successfully login and send token to client
        // create and send token
        createAndSendToken(loginUser, res, isRemember);
    } catch (error) {
        return next(error);
    }
};

const logout = (req, res, next) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken', { path: '/api/user/refreshtoken' });

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
