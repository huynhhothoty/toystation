const express = require('express');
const userRouter = express.Router();
const {
    register,
    login,
    logout,
    getCurrentUser,
    updateUser,
} = require('../controllers/userController');

userRouter.route('/register').post(register);
userRouter.route('/login').post(login);
userRouter.route('/logout').get(logout);
userRouter.route('/currentuser').get(getCurrentUser);
userRouter.route('/:id').patch(updateUser);

module.exports = { userRouter };
