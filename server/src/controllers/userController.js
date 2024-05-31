const { User } = require('../models/userModel');
const { filterObject } = require('../utils/helper');

// const mongoose = require('mongoose');

const getCurrentUser = async (req, res, next) => {
    try {
        const userInfo = await User.findById(req.user._id)
            .select('-password -passwordChangedAt')
            .populate('cart.item')
            .lean();
        res.status(200).send({
            status: 'ok',
            message: 'This user is authenticated successfully',
            data: userInfo,
        });
    } catch (error) {
        return next(error);
    }
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
