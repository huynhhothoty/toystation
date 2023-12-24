import { useMutation } from '@tanstack/react-query';
import { createOrder as createOrderApi } from '../../services/orderService';
import { App } from 'antd';
import { useChangeCart } from '../cart/useChangeCart';
import { useUser } from '../account/useUser';

export function useCreateOrder() {
    const { notification } = App.useApp();
    const { user, isLoading } = useUser();
    const { changeCart, isChanging } = useChangeCart();
    const { mutate: createOrder, isPending } = useMutation({
        mutationFn: ({ userId, cart, address }) => createOrderApi({ userId, cart, address }),
        onSuccess: () => {
            notification.success({
                message: 'Successfully!',
                description: 'Your order has been created!',
            });
            changeCart({ userId: user._id, newCart: [] });
        },
        onError: () => {
            notification.error({
                message: 'Failed',
                description: 'There was an error when creating order, try again',
            });
        },
    });
    const isCreatingOrder = isChanging || isLoading || isPending;

    return { createOrder, isCreatingOrder };
}
