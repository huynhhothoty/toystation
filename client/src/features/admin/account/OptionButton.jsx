import { App, Button, Card, Flex, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { useLogout } from '../../authentication/useLogout';

export default function OptionButton() {
    const { logout, isLogingOut } = useLogout();
    const { modal } = App.useApp();

    function handleLogout() {
        modal.confirm({
            title: 'Log out?',
            onOk: () => logout(),
        });
    }

    return (
        <>
            {isLogingOut && <Spin fullscreen />}
            <Card className='mb-6 border-red-100'>
                <Flex justify='end' gap='large'>
                    <Link to='/'>
                        <Button size='large'>Return production page</Button>
                    </Link>
                    <Button onClick={handleLogout} size='large' danger>
                        Logout
                    </Button>
                </Flex>
            </Card>
        </>
    );
}
