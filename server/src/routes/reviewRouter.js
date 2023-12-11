const { Router } = require('express');
const {
    createReview,
    updateReview,
    deleteReview,
    getAllReview,
    getOneReview,
} = require('../controllers/reviewController');
const { authentication } = require('../middlewares/auth/authenticate');
const { authorization } = require('../middlewares/auth/authorize');

const reviewRouter = Router();

reviewRouter
    .route('/')
    .post(authentication, authorization('guest', 'admin'), createReview)
    .get(getAllReview);

reviewRouter
    .route('/:id')
    .patch(authentication, authorization('admin', 'guest'), updateReview)
    .get(getOneReview)
    .delete(authorization('admin', 'guest'), deleteReview);

module.exports = {
    reviewRouter,
};
