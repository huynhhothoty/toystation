import { orderUrl } from '../utils/api/apis';
import customAxios from './CustomAxios';

export async function createOrder({ userId, cart, address }) {
    const userToken = localStorage.getItem('user_token');

    try {
        const res = await customAxios({
            method: 'post',
            url: orderUrl,
            headers: {
                Authorization: `Bearer ${userToken}`,
                'Content-Type': 'application/json',
            },
            data: {
                user: userId,
                itemList: cart,
                address,
            },
        });
        return res.data;
    } catch (error) {
        const errMsg = error.response.data.message;
        throw new Error(errMsg);
    }
}

export async function getAllOrderOfUser(userId) {
    const userToken = localStorage.getItem('user_token');

    try {
        const res = await customAxios({
            method: 'get',
            url: `${orderUrl}?user=${userId}`,
            headers: {
                Authorization: `Bearer ${userToken}`,
                'Content-Type': 'application/json',
            },
        });

        return res.data.data;
    } catch (error) {
        const errMsg = error.response.data.message;
        throw new Error(errMsg);
    }
}

export async function getAllOrder(filter) {
    const userToken = localStorage.getItem('user_token');

    let baseUrl = orderUrl;
    if (filter.status != 'all') {
        baseUrl = `${orderUrl}?status=${filter.status}`;
    }
    try {
        const res = await customAxios({
            method: 'get',
            url: baseUrl,
            headers: {
                Authorization: `Bearer ${userToken}`,
                'Content-Type': 'application/json',
            },
        });

        return res.data.data;
    } catch (error) {
        const errMsg = error.response.data.message;
        throw new Error(errMsg);
    }
}

export async function getOneOrder(orderId) {
    const userToken = localStorage.getItem('user_token');

    try {
        const res = await customAxios({
            method: 'get',
            url: `${orderUrl}/${orderId}`,
            headers: {
                Authorization: `Bearer ${userToken}`,
                'Content-Type': 'application/json',
            },
        });

        return res.data.data;
    } catch (error) {
        const errMsg = error.response.data.message;
        throw new Error(errMsg);
    }
}

export async function updateOrder({ orderId, data }) {
    const userToken = localStorage.getItem('user_token');

    try {
        const res = await customAxios({
            method: 'patch',
            url: `${orderUrl}/${orderId}`,
            headers: {
                Authorization: `Bearer ${userToken}`,
                'Content-Type': 'application/json',
            },
            data: data,
        });
        return res.data.data;
    } catch (error) {
        const errMsg = error.response.data.message;
        throw new Error(errMsg);
    }
}
