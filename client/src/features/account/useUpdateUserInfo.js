import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserInfo as updateUserInfoApi } from '../../services/userService';
import { App } from 'antd';

export function useUpdateUserInfo() {
    const { notification } = App.useApp();
    const queryClient = useQueryClient();
    const { mutate: updateUserInfo, isPending: isUpdating } = useMutation({
        mutationFn: ({ userId, updateInfo }) => updateUserInfoApi({ userId, updateInfo }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
            notification.success({
                message: 'Successfully!',
                description: 'Update info successfully!',
            });
        },
        onError: (err) => {
            notification.success({
                message: 'Failed',
                description: err.message,
            });
        },
    });

    return { updateUserInfo, isUpdating };
}
