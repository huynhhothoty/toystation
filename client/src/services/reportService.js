import { reportUrl } from '../utils/api/apis';
import customAxios from './CustomAxios';

export async function getOverallStatistic(numDay) {
    try {
        const res = await customAxios({
            method: 'get',
            url: `${reportUrl}?numDay=${numDay}`,
        });

        return res.data.data;
    } catch (error) {
        const errMsg = error.response.data.message;
        throw new Error(errMsg);
    }
}
