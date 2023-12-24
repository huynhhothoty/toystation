import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutApi } from '../../services/userService';
import { App as AntApp } from 'antd';
import { useNavigate } from 'react-router-dom';

export function useLogout() {
    const { notification } = AntApp.useApp();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: logout, isPending: isLogingOut } = useMutation({
        mutationFn: () => logoutApi(),
        onSuccess: () => {
            navigate('/', { replace: true });
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
