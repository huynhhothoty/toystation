const { CustomError } = require('../../utils/CustomError');
const jwt = require('jsonwebtoken');
const { User } = require('../../models/userModel');

const authentication = async (req, res, next) => {
    // check token is in header?
    let token;
    if (req.headers.authorization) {
        // jwt is in format 'Bearer abcxyz'
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    if (!token) return next(new CustomError('Please login first!', 401));

    // validate
    var decode = '';
    try {
        decode = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decode)
    } catch (error) {
        return next(new CustomError('Invalid or Expired token, please login again', 401));
    }

    // check if this user still exist
    const testUser = await User.findById(decode.id);
    if (!testUser) {
        return next(new CustomError('This user has been remove', 401));
    }

    // check if user change password after jwt generated
    const check = testUser.changePasswordAfter(decode.iat);
    if (check) {
        return next(
            new CustomError(
                'Password has been changed after you login, please login again'
            )
        );
    }

    // save user information to request
    req.user = testUser;
    next();
};

module.exports = { authentication };
