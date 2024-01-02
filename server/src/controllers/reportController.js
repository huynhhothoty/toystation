const { User } = require('../models/userModel');
const { Order } = require('../models/orderModel');
const { Toy } = require('../models/toyModel');
const { CustomError } = require('../utils/CustomError');

const getOverallStatistic = async (req, res, next) => {
    try {
        const clientList = await User.find({ role: { $ne: 'admin' } });
        const numbersClient = clientList.length;

        const orderList = await Order.find();
        const numbersOrder = orderList.length;

        let orderStatusCount = {
            unconfirmed: 0,
            'on-going': 0,
            completed: 0,
            failed: 0,
        };
        orderList.forEach((order) => {
            orderStatusCount = {
                ...orderStatusCount,
                [order.status]: orderStatusCount[order.status] + 1,
            };
        });

        const okOrder = orderList.filter((order) => order.status === 'completed');
        const revenue = okOrder.reduce(
            (total, current) => (total += current.totalPrice),
            0
        );

        const toyList = await Toy.find();
        const numbersToy = toyList.length;

        res.status(200).send({
            status: 'ok',
            data: {
                numbersClient,
                numbersOrder,
                orderStatusCount,
                revenue,
                numbersToy,
            },
        });
    } catch (error) {
        console.log(error);
        return next(new CustomError(error));
    }
};

module.exports = {
    getOverallStatistic,
};
