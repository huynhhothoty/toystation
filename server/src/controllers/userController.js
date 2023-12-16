const { User } = require('../models/userModel');
const { CustomError } = require('../utils/CustomError');
const jwt = require('jsonwebtoken');
const { filterObject } = require('../utils/filterObject');
// const mongoose = require('mongoose');

const getCurrentUser = async (req, res, next) => {
    if (req.cookies.jwt) {
        let decode;
        try {
            decode = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
        } catch (error) {
            return next(
                new CustomError('Invalid or Expired token, please login again', 401)
            );
        }
        const currentUser = await User.findById(decode.id).populate({
            path: 'cart',
            populate: { path: 'item' },
        });

        if (currentUser) {
            res.status(200).send({
                status: 'ok',
                user: currentUser,
            });
            return;
        }
    }

    res.status(200).send({
        status: 'ok',
        message: 'No current user',
        user: null,
    });
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

    const filterUser = filterObject(user.toObject(), 'name', 'role', 'email', '_id');
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

const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        // const updatedUser = await User.findOneAndUpdate(
        //     { _id: req.params.id },
        //     req.body,
        //     {
        //         new: true,
        //         runValidators: true,
        //     }
        // );

        res.status(200).send({
            status: 'ok',
            user: updatedUser,
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
    getCurrentUser,
    updateUser,
};
