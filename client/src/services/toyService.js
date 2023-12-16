import { toyUrl } from '../utils/api/apis';
import customAxios from './CustomAxios';

export async function getToys(filter) {
    try {
        let mainUrl = toyUrl;
        if (Object.keys(filter).length > 0) {
            mainUrl += '?';
            for (const key in filter) {
                mainUrl += `${key}=${filter[key]}`;
            }
        }

        const res = await customAxios({
            method: 'get',
            url: mainUrl,
        });

        return res.data.data;
    } catch (error) {
        const errMsg = error.response.data.message;
        throw new Error(errMsg);
    }
}

export async function getToyDetail(toyId) {
    try {
        const res = await customAxios({
            method: 'get',
            url: `${toyUrl}/${toyId}`,
        });

        return res.data.data;
    } catch (error) {
        const errMsg = error.response.data.message;
        throw new Error(errMsg);
    }
}
