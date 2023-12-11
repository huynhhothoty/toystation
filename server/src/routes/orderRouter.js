const { Router } = require('express');
const { authentication } = require('../middlewares/auth/authenticate');
const { authorization } = require('../middlewares/auth/authorize');

const {
    createOrder,
    updateOrder,
    getAllOrder,
    getOneOrder,
    deleteOrder,
} = require('../controllers/orderController');

const orderRouter = Router();

orderRouter.use(authentication);

orderRouter.route('/').post(createOrder).get(getAllOrder);

orderRouter
    .route('/:id')
    .patch(authorization('admin'), updateOrder)
    .delete(authorization('admin'), deleteOrder)
    .get(getOneOrder);

module.exports = {
    orderRouter,
};
