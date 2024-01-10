import { useQuery } from '@tanstack/react-query';
import { getOverallStatistic } from '../../../services/reportService';
import { useSearchParams } from 'react-router-dom';
import { differenceInDays } from 'date-fns';

export function useReport() {
    const [searchParams] = useSearchParams();

    let numDay;
    if (!searchParams.get('numDay') || numDay === 'all')
        numDay = differenceInDays(new Date(), new Date('2023-12-01'));
    else numDay = searchParams.get('numDay');

    const {
        data: report,
        isLoading: isCalculating,
        isError,
    } = useQuery({
        queryKey: ['report', numDay],
        queryFn: () => getOverallStatistic(numDay),
    });

    return { report, isCalculating, isError };
}
