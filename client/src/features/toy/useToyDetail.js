import { useQuery } from '@tanstack/react-query';
import { getToyDetail } from '../../services/toyService';
import { useParams } from 'react-router-dom';

export function useToyDetail(id) {
    const { toyId } = useParams();

    const finalId = toyId ?? id;

    const { data: toyDetail, isLoading } = useQuery({
        queryKey: ['toy', finalId],
        queryFn: () => getToyDetail(finalId),
    });

    return { toyDetail, isLoading };
}
