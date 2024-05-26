const { User } = require('../models/userModel');
const { Order } = require('../models/orderModel');
const { Toy } = require('../models/toyModel');
const { CustomError } = require('../utils/CustomError');
const { subDays, differenceInDays } = require('date-fns');

const getOverallStatistic = async (req, res, next) => {
    try {
        // all time statistic
        const clientList = await User.find({ role: { $ne: 'admin' } });
        const numbersClient = clientList.length;

        const toyList = await Toy.find();
        const numbersToy = toyList.length;

        // statistic base on section
        let detail = [];
        let numDay;
        numDay = req.query?.numDay;

        // if req do not contain numday in query param, mean count from the day store open
        if (!numDay || numDay === 'all') {
            const day1 = new Date();
            const day2 = new Date('2023-12-01');
            numDay = differenceInDays(day1, day2);
        }

        // divide the time into 7 section, calculate statis of each section
        const timePeriod = numDay / 7;
        let endDay = new Date().setHours(23, 59, 59, 999);
        for (let i = 1; i <= 7; i++) {
            const startDay = subDays(endDay, timePeriod - 1);
            startDay.setHours(0, 0, 0, 0);
            const tempResult = await calculateStatisticInPeriod(startDay, endDay);
            detail.push(tempResult);

            endDay = subDays(startDay, 1).setHours(23, 59, 59, 999);
        }

        // total statistic
        const {
            numbersOrder: totalNumOrder,
            orderStatusCount: totalOrderStatus,
            revenue: totalRevenue,
        } = await calculateStatisticInPeriod(subDays(new Date(), numDay), new Date());

        res.status(200).send({
            status: 'ok',
            data: {
                numbersClient,
                numbersToy,
                totalNumOrder,
                totalOrderStatus,
                totalRevenue,
                detail,
            },
        });
    } catch (error) {
        return next(new CustomError(error));
    }
};

async function calculateStatisticInPeriod(startDay, endDay) {
    let orderList;
    if (startDay && endDay)
        orderList = await Order.find({
            createdAt: {
                $gte: startDay,
                $lte: endDay,
            },
        });
    // orderList = await Order.find();

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
    const revenue = okOrder.reduce((total, current) => (total += current.totalPrice), 0);

    return {
        numbersOrder,
        orderStatusCount,
        revenue,
    };
}

module.exports = {
    getOverallStatistic,
};
