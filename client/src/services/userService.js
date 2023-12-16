// import axios from 'axios';
import customAxios from './CustomAxios';
import { loginUrl, logoutUrl, getCurUserUrl } from '../utils/api/apis';

export async function login({ email, password }) {
    try {
        let data = await customAxios({
            method: 'post',
            url: loginUrl,
            data: {
                email: email,
                password: password,
            },
        });

        return data;
    } catch (error) {
        const errMsg = error.response.data.message;
        throw new Error(errMsg);
    }
}

export async function getCurrentUser() {
    try {
        let data = await customAxios({
            method: 'get',
            url: getCurUserUrl,
        });

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
