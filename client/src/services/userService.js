// import axios from 'axios';
import {
    changePassUrl,
    forgetPassUrl,
    getCurUserUrl,
    loginUrl,
    logoutUrl,
    refreshTokenUrl,
    registerUrl,
    resetPassUrl,
    userUrl,
} from '../utils/api/apis';
import customAxios from './CustomAxios';

export async function updatePassword({ oldPassword, newPassword }) {
    try {
        const res = await customAxios({
            method: 'patch',
            url: changePassUrl,
            data: {
                oldPassword,
                newPassword,
            },
        });

        return res.data;
    } catch (error) {
        const errMsg = error.response.data.message;
        throw new Error(errMsg);
    }
}

export async function updateUserInfo({ userId, updateInfo }) {
    try {
        const res = await customAxios({
            method: 'patch',
            url: `${userUrl}/${userId}`,
            data: updateInfo,
        });

        return res.data;
    } catch (error) {
        const errMsg = error.response.data.message;
        throw new Error(errMsg);
    }
}

export async function forgetPassword({ email }) {
    try {
        const res = await customAxios({
            method: 'post',
            url: forgetPassUrl,
            data: {
                email,
            },
        });

        return res.data;
    } catch (error) {
        const errMsg = error.response.data.message;
        throw new Error(errMsg);
    }
}

export async function resetPassword({ userId, newPassword, resetToken }) {
    try {
        const res = await customAxios({
            method: 'patch',
            url: `${resetPassUrl}/${userId}`,
            data: {
                newPassword,
                resetToken,
            },
        });

        return res.data;
    } catch (error) {
        const errMsg = error.response.data.message;
        throw new Error(errMsg);
    }
}

export async function register({ email, password, phone, name }) {
    try {
        const res = await customAxios({
            method: 'post',
            url: registerUrl,
            data: {
                email,
                password,
                phone,
                name,
            },
        });

        return res.data;
    } catch (error) {
        const errMsg = error.response.data.message;
        throw new Error(errMsg);
    }
}

export async function login({ email, password, isRemember }) {
    try {
        const res = await customAxios({
            method: 'post',
            url: loginUrl,
            data: {
                email,
                password,
                isRemember,
            },
        });

        return res.data.data;
    } catch (error) {
        const errMsg = error.response.data.message;
        throw new Error(errMsg);
    }
}

export async function getCurrentUser() {
    try {
        const data = await customAxios({
            method: 'get',
            url: getCurUserUrl,
        });

        return data.data.data;
    } catch (error) {
        return null;
    }
}

export async function logout() {
    try {
        await customAxios({
            method: 'get',
            url: logoutUrl,
        });
    } catch (error) {
        throw new Error('There was an error, try again');
    }
}

export async function refreshToken() {
    try {
        const res = await customAxios({
            method: 'get',
            url: refreshTokenUrl,
        });

        return res.data;
    } catch (error) {
        const errMsg = error.response.data.message;
        return errMsg;
    }
}
