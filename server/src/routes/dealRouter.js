const { Router } = require('express');
const {
    createDeal,
    updateDeal,
    getAllDeal,
    getOneDeal,
    deleteDeal,
} = require('../controllers/dealController');
const { authentication } = require('../middlewares/auth/authenticate');
const { authorization } = require('../middlewares/auth/authorize');

const dealRouter = Router();

dealRouter
    .route('/')
    .post(authentication, authorization('admin'), createDeal)
    .get(getAllDeal);

dealRouter
    .route('/:id')
    .patch(authorization('admin'), updateDeal)
    .get(getOneDeal)
    .delete(authorization('admin'), deleteDeal);

module.exports = {
    dealRouter,
};
