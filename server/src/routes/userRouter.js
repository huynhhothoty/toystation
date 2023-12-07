import express from 'express';
const userRouter = express.Router();

userRouter.route('/abc').get((req, res) => {
    res.status(200).send({
        status: 'ok',
        message: 'hahahaha',
    });
});

export { userRouter };
