import { Outlet, useNavigate } from 'react-router-dom';
import { useUser } from '../features/account/useUser';
import { App, Spin } from 'antd';
import { useEffect } from 'react';

export default function ProtectRoute() {
    const { isAuthenticated, isLoading } = useUser();
    const { message } = App.useApp();
    const navigate = useNavigate();

    useEffect(
        function () {
            if (!isAuthenticated && !isLoading) {
                navigate('/', { replace: true });
                message.warning('Please login first');
                return;
            }
        },
        [isAuthenticated, isLoading, navigate, message]
    );
    if (isLoading) return <Spin size='large' fullscreen />;

    return <Outlet />;
}
