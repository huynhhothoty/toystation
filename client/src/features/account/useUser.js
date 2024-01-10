import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/userService';

export function useUser() {
    const userToken = window.localStorage.getItem('user_token') ?? '';
    const { data: user, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: () => getCurrentUser(userToken),
    });

    return { user, isLoading, isAuthenticated: Boolean(user?.name) };
}
