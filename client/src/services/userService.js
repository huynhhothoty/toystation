// import axios from 'axios';
import customAxios from './CustomAxios';
import {
    loginUrl,
    logoutUrl,
    getCurUserUrl,
    registerUrl,
    forgetPassUrl,
    resetPassUrl,
    userUrl,
    changePassUrl,
} from '../utils/api/apis';

export async function updatePassword({ oldPassword, newPassword }) {
    const userToken = localStorage.getItem('user_token');

    try {
        const res = await customAxios({
            method: 'patch',
            url: changePassUrl,
            data: {
                oldPassword,
                newPassword,
            },
            headers: {
                Authorization: `Bearer ${userToken}`,
                'Content-Type': 'application/json',
            },
        });

        return res.data;
    } catch (error) {
        const errMsg = error.response.data.message;
        throw new Error(errMsg);
    }
}

export async function updateUserInfo({ userId, updateInfo }) {
    const userToken = localStorage.getItem('user_token');

    try {
        const res = await customAxios({
            method: 'patch',
            url: `${userUrl}/${userId}`,
            data: updateInfo,
            headers: {
                Authorization: `Bearer ${userToken}`,
                'Content-Type': 'application/json',
            },
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

export async function login({ email, password }) {
    try {
        const res = await customAxios({
            method: 'post',
            url: loginUrl,
            data: {
                email: email,
                password: password,
            },
        });

        return res.data;
    } catch (error) {
        const errMsg = error.response.data.message;
        throw new Error(errMsg);
    }
}

export async function getCurrentUser(userToken) {
    try {
        const data = await customAxios({
            method: 'get',
            url: getCurUserUrl,
            headers: {
                Authorization: `Bearer ${userToken}`,
                'Content-Type': 'application/json',
            },
        });

        console.log(data);

        return data.data.user;
    } catch (error) {
        return null;
    }
}

export async function logout() {
    try {
        await customAxios({
            withCredentials: true,
            method: 'get',
            url: logoutUrl,
        });
    } catch (error) {
        throw new Error('There was an error, try again');
    }
}
