const express = require('express');
const {
    createToy,
    updateToy,
    deleteToy,
    getAllToy,
    getOneToy,
} = require('../controllers/toyController');
const { authentication } = require('../middlewares/auth/authenticate');
const { authorization } = require('../middlewares/auth/authorize');

const toyRouter = express.Router();

toyRouter
    .route('/')
    .post(authentication, authorization('admin'), createToy)
    .get(getAllToy);

toyRouter
    .route('/:id')
    .patch(authorization('admin'), updateToy)
    .get(getOneToy)
    .delete(authorization('admin'), deleteToy);

module.exports = {
    toyRouter,
};