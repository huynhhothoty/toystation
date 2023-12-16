import { useQuery } from '@tanstack/react-query';
import { getToyDetail } from '../../services/toyService';
import { useParams } from 'react-router-dom';

export function useToyDetail() {
    const { toyId } = useParams();

    const { data: toyDetail, isLoading } = useQuery({
        queryKey: ['toy'],
        queryFn: () => getToyDetail(toyId),
    });

    return { toyDetail, isLoading };
}
