import {
    InfoCircleOutlined,
    LaptopOutlined,
    LoginOutlined,
    LogoutOutlined,
    SearchOutlined,
    SettingOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { App, Button, Col, Dropdown, Image, Input, Row, Space, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useLogout } from '../features/authentication/useLogout';
import { useLocalStorageState } from '../hooks/useLocalStorageState';
import CartButton from './CartButton';
const { Text } = Typography;

export default function HeaderContent() {
    const navigate = useNavigate();

    const [name, setName] = useLocalStorageState(null, 'name');
    const [role, setRole] = useLocalStorageState(null, 'role');

    const { modal } = App.useApp();
    const { logout } = useLogout();
    const itemsAuthAdmin = [
        {
            label: 'Admin Page',
            key: '1',
            icon: <LaptopOutlined />,
            onClick: () => navigate('/admin'),
        },
        {
            type: 'divider',
        },
        {
            label: 'Logout',
            key: '2',
            icon: <LogoutOutlined />,
            danger: true,
            onClick: handleLogout,
        },
    ];
    const itemsWhenAuth = [
        {
            label: 'Account',
            key: '1',
            icon: <SettingOutlined />,
            onClick: () => navigate('/account'),
        },
        {
            label: 'My order',
            key: '2',
            icon: <InfoCircleOutlined />,
            onClick: () => navigate('/ordertracking'),
        },
        {
            type: 'divider',
        },
        {
            label: 'Logout',
            key: '3',
            icon: <LogoutOutlined />,
            danger: true,
            onClick: handleLogout,
        },
    ];
    const itemsWhenNotAuth = [
        {
            label: 'Login',
            key: '1',
            icon: <LoginOutlined />,
            onClick: () => navigate('/login'),
        },
        {
            label: 'Register',
            key: '2',
            icon: <UserOutlined />,
            onClick: () => navigate('/register'),
        },
    ];

    function handleLogout() {
        modal.confirm({
            title: 'Are you sure to logout?',
            onOk: () => {
                logout(
                    {},
                    {
                        onSuccess: () => {
                            setName(null);
                            setRole(null);
                        },
                    }
                );
            },
        });
    }

    return (
        <Row align='middle' justify='space-evenly'>
            <Col span={3} offset={1}>
                <Link to='/'>
                    <Image preview={false} src='/textlogo.png' />
                </Link>
            </Col>
            <Col span={8} offset={1}>
                <Input
                    prefix={<SearchOutlined />}
                    className='rounded-full border-2 border-black placeholder:tracking-wide'
                    placeholder='Explore some wonderful toys...'
                    size='large'
                    onPressEnter={(e) => {
                        navigate(`/toys?name=${e.target.value}`);
                    }}
                />
            </Col>

            <Col span={5} offset={1}>
                <Space size='large'>
                    {/* <MessageButton openLogin={handleOpenLogin} /> */}
                    <CartButton />
                    <Dropdown
                        arrow
                        menu={{
                            items: name
                                ? role === 'admin'
                                    ? itemsAuthAdmin
                                    : itemsWhenAuth
                                : itemsWhenNotAuth,
                        }}
                        trigger={['click']}
                        placement='bottomRight'
                    >
                        <Button size='large' shape='circle' icon={<UserOutlined />} />
                    </Dropdown>
                </Space>
                <Text type='danger' className='ps-2'>
                    {name ? name : ''}
                </Text>
            </Col>
        </Row>
    );
}
