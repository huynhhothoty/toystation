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
                message: 'Add to cart successfully!',
                description: 'Please continue your shopping',
            });
        },
        onError: () => {
            notification.error({
                message: 'Failed',
                description: 'There was an error, try again',
            });
        },
    });

    return { changeCart, isChanging };
}
