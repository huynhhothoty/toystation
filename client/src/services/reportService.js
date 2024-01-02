import { reportUrl } from '../utils/api/apis';
import customAxios from './CustomAxios';

export async function getOverallStatistic() {
    try {
        const res = await customAxios({
            method: 'get',
            url: reportUrl,
        });

        return res.data.data;
    } catch (error) {
        const errMsg = error.response.data.message;
        throw new Error(errMsg);
    }
}
