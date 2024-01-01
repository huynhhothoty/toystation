import { useQuery } from '@tanstack/react-query';
import { getAllOrder } from '../../../services/orderService';
import { useSearchParams } from 'react-router-dom';

export function useOrder() {
    const [searchParams] = useSearchParams();
    const status = searchParams.get('status') ?? 'all';

    const { data: order, isPending: isGettingOrder } = useQuery({
        queryKey: ['orders', status],
        queryFn: () => getAllOrder({ status }),
    });

    return { order, isGettingOrder };
}
