const express = require('express');
const { authentication } = require('../middlewares/auth/authenticate');
const { authorization } = require('../middlewares/auth/authorize');
const { getOverallStatistic } = require('../controllers/reportController');

const reportRouter = express.Router();
reportRouter.use(authentication);
reportRouter.use(authorization('admin'));

reportRouter.route('/').get(getOverallStatistic);

module.exports = {
    reportRouter,
};
