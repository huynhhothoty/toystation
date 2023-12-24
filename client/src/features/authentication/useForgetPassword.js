import { useMutation } from '@tanstack/react-query';
import { forgetPassword as forgetPasswordApi } from '../../services/userService';
import { App } from 'antd';

export function useForgetPassword() {
    const { notification } = App.useApp();
    const { mutate: sendResetCode, isPending: isSending } = useMutation({
        mutationFn: ({ email }) => forgetPasswordApi({ email }),
        onSuccess: () => {
            notification.success({
                message: 'Code has been sent',
                description: 'Please check your email',
            });
        },
        onError: (err) => {
            notification.error({
                message: 'Failed',
                description: err.message,
            });
        },
    });

    return { sendResetCode, isSending };
}
