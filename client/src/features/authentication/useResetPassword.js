import { useMutation } from '@tanstack/react-query';
import { resetPassword as resetPasswordApi } from '../../services/userService';
import { App } from 'antd';

export function useResetPassword() {
    const { notification } = App.useApp();
    const { mutate: resetPassword, isPending: isResetting } = useMutation({
        mutationFn: ({ userId, newPassword, resetToken }) =>
            resetPasswordApi({ userId, newPassword, resetToken }),
        onSuccess: () => {
            notification.success({
                message: 'Successfully',
                description: 'Reset successfully!',
                placement: 'topLeft',
            });
        },
        onError: (err) => {
            notification.success({
                message: 'Failed',
                description: err.message,
            });
        },
    });

    return { resetPassword, isResetting };
}
