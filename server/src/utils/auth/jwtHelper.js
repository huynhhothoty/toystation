const { User } = require('../../models/userModel');
const { CustomError } = require('../CustomError');
const jwt = require('jsonwebtoken');

const signAccessToken = (payload) => {
    const jwtToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: process.env.JWT_ACCESS_EXPIRES,
    });
    return jwtToken;
};
const signRefreshToken = (payload) => {
    const jwtToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES,
    });
    return jwtToken;
};

const verifyAccessToken = (req, res, next) => {
    try {
        // check token is in header or cookie
        let token;
        if (req.headers.authorization) {
            // jwt is in format 'Bearer abcxyz'
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies['accessToken']) {
            token = req.cookies['accessToken'];
        }

        if (!token) return next(new CustomError('Please login first!', 401));

        // validate
        let decode = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.user = decode;

        return next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            res.status(401).send({
                status: 'fail',
                message: error.message, // 'jwt expired'
            });
        } else {
            return next(new CustomError('Invalid token, please login again', 401));
        }
    }
};

const verifyRefreshToken = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization) {
            // jwt is in format 'Bearer abcxyz'
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies['refreshToken']) {
            token = req.cookies['refreshToken'];
        }

        if (!token) return next(new CustomError('Please login', 401));

        // validate

        let decode = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

        // check if this user still exist
        const testAccount = await User.findById(decode._id);
        if (!testAccount) {
            return next(new CustomError('This user has been remove', 401));
        }

        // check if user change password after jwt generated
        const check = testAccount.changePasswordAfter(decode.iat);
        if (check) {
            return next(
                new CustomError(
                    'Password has been changed after you login, please login again'
                )
            );
        }

        req.user = testAccount;
        req.isRemember = decode.isRemember;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            res.status(401).send({
                status: 'fail',
                message: 'refresh jwt expired', // 'jwt expired'
            });
        } else {
            return next(new CustomError('Invalid token, please login again', 401));
        }
    }
};

module.exports = {
    signAccessToken,
    signRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
};
