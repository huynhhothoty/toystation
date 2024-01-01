import { orderUrl } from '../utils/api/apis';
import customAxios from './CustomAxios';

export async function createOrder({ userId, cart, address }) {
    try {
        const res = await customAxios({
            method: 'post',
            url: orderUrl,
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
    try {
        const res = await customAxios({
            method: 'get',
            url: `${orderUrl}?user=${userId}`,
        });

        return res.data.data;
    } catch (error) {
        const errMsg = error.response.data.message;
        throw new Error(errMsg);
    }
}

export async function getAllOrder(filter) {
    let baseUrl = orderUrl;
    if (filter.status != 'all') {
        baseUrl = `${orderUrl}?status=${filter.status}`;
    }
    try {
        const res = await customAxios({
            method: 'get',
            url: baseUrl,
        });

        return res.data.data;
    } catch (error) {
        const errMsg = error.response.data.message;
        throw new Error(errMsg);
    }
}

export async function getOneOrder(orderId) {
    try {
        const res = await customAxios({
            method: 'get',
            url: `${orderUrl}/${orderId}`,
        });

        return res.data.data;
    } catch (error) {
        const errMsg = error.response.data.message;
        throw new Error(errMsg);
    }
}

export async function updateOrder({ orderId, data }) {
    try {
        const res = await customAxios({
            method: 'patch',
            url: `${orderUrl}/${orderId}`,
            data: data,
        });
        return res.data.data;
    } catch (error) {
        const errMsg = error.response.data.message;
        throw new Error(errMsg);
    }
}
