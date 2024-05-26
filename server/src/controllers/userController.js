const { User } = require('../models/userModel');
const { CustomError } = require('../utils/CustomError');
const jwt = require('jsonwebtoken');
const { filterObject } = require('../utils/filterObject');

// const mongoose = require('mongoose');

const getCurrentUser = async (req, res, next) => {
    let token;
    if (req.headers.authorization) {
        let decode;
        token = req.headers.authorization.split(' ')[1];

        try {
            decode = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return next(
                new CustomError('Invalid or Expired token, please login again', 401)
            );
        }
        const currentUser = await User.findById(decode.id).populate({
            path: 'cart',
            populate: { path: 'item' },
        });

        if (currentUser && !currentUser.changePasswordAfter(decode.iat)) {
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

const updateUser = async (req, res, next) => {
    try {
        const filterBody = filterObject(req.body, 'name', 'cart', 'phone', 'address');

        const updatedUser = await User.findByIdAndUpdate(req.params.id, filterBody, {
            new: true,
            runValidators: true,
        });

        res.status(200).send({
            status: 'ok',
            user: updatedUser,
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    getCurrentUser,
    updateUser,
};
