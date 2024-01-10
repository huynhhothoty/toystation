import { useQuery } from '@tanstack/react-query';
import { getToys } from '../../services/toyService';
import { useSearchParams } from 'react-router-dom';

export function useToys() {
    const [searchParams] = useSearchParams();
    let filter = {};

    for (let entry of searchParams.entries()) {
        filter = { ...filter, [entry[0]]: entry[1] };
    }

    const { data: toys, isLoading } = useQuery({
        queryKey: ['toys', filter],
        queryFn: () => getToys(filter),
    });

    return { toys, isLoading };
}
