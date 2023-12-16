const { Router } = require('express');
const { userRouter } = require('./userRouter.js');
const { toyRouter } = require('./toyRouter.js');
const { orderRouter } = require('./orderRouter.js');
const { dealRouter } = require('./dealRouter.js');
const { reviewRouter } = require('./reviewRouter.js');

const rootRouter = Router();
rootRouter.use('/user', userRouter);
rootRouter.use('/toy', toyRouter);
rootRouter.use('/order', orderRouter);
rootRouter.use('/deal', dealRouter);
rootRouter.use('/review', reviewRouter);

module.exports = { rootRouter };