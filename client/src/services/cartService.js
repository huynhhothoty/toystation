import { userUrl } from '../utils/api/apis';
import customAxios from './CustomAxios';

export async function changeCart({ userId, newCart }) {
    try {
        const res = await customAxios({
            withCredentials: true,
            method: 'patch',
            url: `${userUrl}/${userId}`,
            data: {
                cart: newCart,
            },
        });
        return res.data.user;
    } catch (error) {
        const errMsg = error.response.data.message;
        throw new Error(errMsg);
    }
}
