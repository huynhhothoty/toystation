import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/userService';
import { App as AntApp } from 'antd';

export function useLogin() {
    const queryClient = useQueryClient();
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
            queryClient.setQueryData(['user'], data.data.user);
            showSuccessNotice(data.data.user.name);
        },
        onError: (err) => {
            showFailedNotice(err.message);
        },
    });

    return { login, isLoging };
}
