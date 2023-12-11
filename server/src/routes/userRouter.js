const express = require('express');
const userRouter = express.Router();
const { register, login } = require('../controllers/userController');

userRouter.route('/register').post(register);
userRouter.route('/login').post(login);

module.exports = { userRouter };
