const { Order } = require('../models/orderModel');
const { createOne, getAll, getOne, updateOne, deleteOne } = require('./crudController');

const createOrder = createOne(Order);
const updateOrder = updateOne(Order);
const getAllOrder = getAll(Order);
const getOneOrder = getOne(Order, [{ path: 'itemList' }, { path: 'dealList' }]);
const deleteOrder = deleteOne(Order);

module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    getAllOrder,
    getOneOrder,
};
