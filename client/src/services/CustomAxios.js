import axios from 'axios';
import { refreshToken } from './userService';
import { message } from 'antd';

const instance = axios.create({
    withCredentials: true,
});

// before send request to server
// instance.interceptors.request.use(
//     (req) => {
//         console.log('before request');
//     },
//     (error) => {
//         console.log('error');
//     }
// );

// after server response
instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (error) => {
        const { data } = error.response;

        const config = error.config;
        if (data?.message === 'jwt expired') {
            const refreshResponse = await refreshToken();
            if (refreshResponse === 'refresh jwt expired') {
                message.error('Your session has run out, please login again!');
                window.location.href = '/login';
                return Promise.reject(error);
            }
            return instance(config);
        }

        return Promise.reject(error);
    }
);

export default instance;
