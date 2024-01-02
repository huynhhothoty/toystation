import { useQuery } from '@tanstack/react-query';
import { getOverallStatistic } from '../../../services/reportService';

export function useReport() {
    const {
        data: report,
        isLoading: isCalculating,
        isError,
    } = useQuery({
        queryKey: ['report'],
        queryFn: getOverallStatistic,
    });

    return { report, isCalculating, isError };
}
