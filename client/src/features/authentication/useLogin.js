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
            placement: 'topLeft',
        });
    };
    const showFailedNotice = (message) => {
        notification.error({
            message: 'Failed',
            description: message,
        });
    };

    const { mutate: login, isPending: isLoging } = useMutation({
        mutationFn: ({ email, password, isRemember }) => loginApi({ email, password, isRemember }),
        onSuccess: (data) => {
            queryClient.setQueryData(['user'], data.user);
            showSuccessNotice(data.user.name);

            localStorage.setItem('name', JSON.stringify(data.user.name));
            localStorage.setItem('role', JSON.stringify(data.user.role));

            if (data.user.role === 'admin') navigate('/admin', { replace: true });
            else navigate(-1, { replace: true });
        },
        onError: (err) => {
            showFailedNotice(err.message);
        },
    });

    return { login, isLoging };
}
