import express from 'express';
import { userRouter } from './userRouter.js';

const rootRouter = express.Router();
rootRouter.use(userRouter);

export { rootRouter };
