import { useMutation, useQueryClient } from '@tanstack/react-query';
import { changeCart as changeCartApi } from '../../services/cartService';
import { App } from 'antd';

export function useChangeCart() {
    const { notification } = App.useApp();
    const queryClient = useQueryClient();
    const { mutate: changeCart, isPending: isChanging } = useMutation({
        mutationFn: ({ userId, newCart }) => changeCartApi({ userId: userId, newCart: newCart }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['user'],
            });

            notification.success({
                message: 'Update cart successfully!',
                description: 'Please continue your shopping',
                placement: 'bottomLeft',
                duration: 1,
            });
        },
        onError: () => {
            notification.error({
                message: 'Failed',
                description: 'There was an error, try again',
                placement: 'bottomLeft',
            });
        },
    });

    return { changeCart, isChanging };
}
