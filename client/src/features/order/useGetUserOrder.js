import { useQuery } from '@tanstack/react-query';
import { getAllOrderOfUser } from '../../services/orderService';
import { useUser } from '../account/useUser';

export function useGetUserOrder() {
    const { user } = useUser();
    const { data: userOrder, isPending: isGettingOrder } = useQuery({
        queryKey: ['order'],
        queryFn: () => getAllOrderOfUser(user._id),
    });

    return { userOrder, isGettingOrder };
}
