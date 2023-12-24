const express = require('express');
const userRouter = express.Router();
const { getCurrentUser, updateUser } = require('../controllers/userController');
const {
    register,
    login,
    logout,
    forgetPassword,
    resetPassword,
    changePassword,
} = require('../controllers/authController');
const { authentication } = require('../middlewares/auth/authenticate');

userRouter.route('/register').post(register);
userRouter.route('/login').post(login);
userRouter.route('/logout').get(logout);
userRouter.route('/currentuser').get(getCurrentUser);
userRouter.route('/forgetpassword').post(forgetPassword);
userRouter.route('/resetpassword/:id').patch(resetPassword);
userRouter.route('/changepassword').patch(authentication, changePassword);
userRouter.route('/:id').patch(updateUser);

module.exports = { userRouter };
