const { Review } = require('../models/reviewModel');
const { createOne, getAll, getOne, updateOne, deleteOne } = require('./crudController');

const createReview = createOne(Review);
const updateReview = updateOne(Review);
const getAllReview = getAll(Review);
const getOneReview = getOne(Review, null);
const deleteReview = deleteOne(Review);

module.exports = {
    createReview,
    updateReview,
    deleteReview,
    getAllReview,
    getOneReview,
};
