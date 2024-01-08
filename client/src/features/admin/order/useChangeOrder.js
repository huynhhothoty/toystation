import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateOrder } from '../../../services/orderService';
import { App } from 'antd';

export default function useChangeOrder() {
    const { message } = App.useApp();
    const queryClient = useQueryClient();

    const { mutate: changeOrder, isPending: isChangingOrder } = useMutation({
        mutationFn: ({ orderId, data }) => updateOrder({ orderId, data }),
        onSuccess: () => {
            message.success('Update order successfully');
            queryClient.invalidateQueries(['orders']);
        },
        onError: () => {
            message.error('Update order failed');
        },
    });

    return { changeOrder, isChangingOrder };
}
