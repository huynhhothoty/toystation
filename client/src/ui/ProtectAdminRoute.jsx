import { App, Spin } from 'antd';
import { useUser } from '../features/account/useUser';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProtectAdminRoute({ children }) {
    const { user, isLoading, isAuthenticated } = useUser();
    const navigate = useNavigate();
    const { message } = App.useApp();

    useEffect(
        function () {
            if (!isLoading && isAuthenticated && user?.role !== 'admin') {
                message.warning('This url is only for admin!');
                navigate('/');
            }
        },
        [isAuthenticated, isLoading, user, message, navigate]
    );

    if (isLoading) return <Spin fullscreen size='large' />;

    return children;
}
