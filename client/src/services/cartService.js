import { userUrl } from '../utils/api/apis';
import customAxios from './CustomAxios';

export async function changeCart({ userId, newCart }) {
    const userToken = localStorage.getItem('user_token');
    try {
        const res = await customAxios({
            withCredentials: true,
            method: 'patch',
            url: `${userUrl}/${userId}`,
            headers: {
                Authorization: `Bearer ${userToken}`,
                'Content-Type': 'application/json',
            },
            data: {
                cart: newCart,
            },
        });
        return res.data.cart;
    } catch (error) {
        const errMsg = error.response.data.message;
        throw new Error(errMsg);
    }
}
