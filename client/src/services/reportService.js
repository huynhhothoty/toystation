import { reportUrl } from '../utils/api/apis';
import customAxios from './CustomAxios';

export async function getOverallStatistic() {
    const userToken = localStorage.getItem('user_token');

    try {
        const res = await customAxios({
            method: 'get',
            url: reportUrl,
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
