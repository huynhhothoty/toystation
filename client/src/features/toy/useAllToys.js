import { useQuery } from '@tanstack/react-query';
import { getToys } from '../../services/toyService';

export function useAllToys() {
    const { data: toys, isLoading } = useQuery({
        queryKey: ['toys-all'],
        queryFn: () => getToys({}),
    });

    return { toys, isLoading };
}
