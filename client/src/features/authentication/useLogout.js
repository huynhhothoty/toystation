import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutApi } from '../../services/userService';
import { App as AntApp } from 'antd';

export function useLogout() {
    const { notification } = AntApp.useApp();
    const queryClient = useQueryClient();

    const { mutate: logout, isPending: isLogingOut } = useMutation({
        mutationFn: () => logoutApi(),
        onSuccess: () => {
            notification.success({
                message: 'Success',
                description: 'Logout successfully!',
            });
            queryClient.removeQueries();
        },
        onError: () => {
            notification.error({
                message: 'Failed',
                description: 'Logout failed, try again!',
            });
        },
    });

    return { logout, isLogingOut };
}
