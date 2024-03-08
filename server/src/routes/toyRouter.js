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
const { checkCache } = require('../middlewares/cache/toyCache');

const toyRouter = express.Router();

toyRouter
    .route('/')
    .post(authentication, authorization('admin'), createToy)
    .get(checkCache, getAllToy);

toyRouter
    .route('/:id')
    .patch(authentication, authorization('admin'), updateToy)
    .get(getOneToy)
    .delete(authentication, authorization('admin'), deleteToy);

module.exports = {
    toyRouter,
};
