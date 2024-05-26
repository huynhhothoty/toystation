const { Router } = require('express');
const { userRouter } = require('./userRouter.js');
const { toyRouter } = require('./toyRouter.js');
const { orderRouter } = require('./orderRouter.js');
const { dealRouter } = require('./dealRouter.js');
const { reviewRouter } = require('./reviewRouter.js');
const { reportRouter } = require('./reportRoute.js');

const rootRouter = Router();

// check health route
rootRouter.use('/hello', (req, res) => {
    res.status(200).send('Hello World :)');
});

rootRouter.use('/user', userRouter);
rootRouter.use('/toy', toyRouter);
rootRouter.use('/order', orderRouter);
rootRouter.use('/deal', dealRouter);
rootRouter.use('/review', reviewRouter);
rootRouter.use('/report', reportRouter);

module.exports = { rootRouter };
