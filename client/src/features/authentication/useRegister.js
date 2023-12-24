import { useMutation } from '@tanstack/react-query';
import { register as registerApi } from '../../services/userService';
import { App } from 'antd';

export function useRegister() {
    const { notification } = App.useApp();
    const { mutate: register, isPending: isRegistering } = useMutation({
        mutationFn: ({ email, password, phone, name }) =>
            registerApi({ email, password, phone, name }),
        onSuccess: () => {
            notification.success({
                message: 'Register successfully!',
                description: 'Please login right now!',
            });
        },
        onError: () => {
            notification.error({
                message: 'Failed',
                description: 'There was an error, try again',
            });
        },
    });

    return { register, isRegistering };
}
