import { useQuery } from '@tanstack/react-query';
import { getOneOrder } from '../../../services/orderService';
import { useParams } from 'react-router-dom';

export function useOrderDetail() {
    const { orderId } = useParams();
    const { data: orderDetail, isPending: isGettingOrderDetail } = useQuery({
        queryKey: ['order', orderId],
        queryFn: () => getOneOrder(orderId),
    });

    return { orderDetail, isGettingOrderDetail };
}
