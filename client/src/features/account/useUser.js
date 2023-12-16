import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/userService';

export function useUser() {
    const { data: user, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: () => getCurrentUser(),
    });

    return { user, isLoading, isAuthenticated: Boolean(user?.name) };
}
