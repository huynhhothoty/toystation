import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getCurrentUser } from '../../services/userService';

export function useUser() {
    const [userToken] = useState(function () {
        return localStorage.getItem('user_token') ?? '';
    });
    const { data: user, isLoading } = useQuery({
        queryKey: ['user', userToken],
        queryFn: () => getCurrentUser(userToken),
    });

    return { user, isLoading, isAuthenticated: Boolean(user?.name) };
}
