import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App as AntApp } from 'antd';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../../services/userService';

export function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { notification } = AntApp.useApp();
    const showSuccessNotice = (userName) => {
        notification.success({
            message: 'Success',
            description: `Welcome back, ${userName}`,
        });
    };
    const showFailedNotice = (message) => {
        notification.error({
            message: 'Failed',
            description: message,
        });
    };

    const { mutate: login, isPending: isLoging } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email: email, password: password }),
        onSuccess: (data) => {
            queryClient.setQueryData(['user'], data.user);
            showSuccessNotice(data.user.name);
            if (data.user.role === 'admin') navigate('/admin');

            localStorage.setItem('user_token', data.accessToken);
        },
        onError: (err) => {
            showFailedNotice(err.message);
        },
    });

    return { login, isLoging };
}
