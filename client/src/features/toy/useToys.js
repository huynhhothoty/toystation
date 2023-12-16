import { useQuery } from '@tanstack/react-query';
import { getToys } from '../../services/toyService';
import { useSearchParams } from 'react-router-dom';

export function useToys() {
    const [searchParams] = useSearchParams();
    let filter = {};

    const toyName = searchParams.get('toyname');
    if (toyName?.length > 0) {
        filter = {
            name: toyName,
        };
    }

    const { data: toys, isLoading } = useQuery({
        queryKey: ['toys', toyName],
        queryFn: () => getToys(filter),
    });

    return { toys, isLoading };
}
