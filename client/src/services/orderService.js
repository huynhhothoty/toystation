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
