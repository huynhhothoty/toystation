import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { updatePassword } from '../../services/userService';

export function useChangePassword() {
    const { notification } = App.useApp();
    const queryClient = useQueryClient();
    const { mutate: changePassword, isPending: isChangingPassword } = useMutation({
        mutationFn: ({ oldPassword, newPassword }) => updatePassword({ oldPassword, newPassword }),
        onSuccess: () => {
            queryClient.invalidateQueries();
            notification.success({
                message: 'Successfully',
                description: 'Update password successfully',
            });
        },
        onError: (err) => {
            notification.success({
                message: 'Failed',
                description: err.message,
            });
        },
    });

    return { changePassword, isChangingPassword };
}
