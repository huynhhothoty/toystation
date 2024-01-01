import {
    Alert,
    App,
    Button,
    Col,
    Dropdown,
    Image,
    Input,
    Modal,
    Row,
    Space,
    Typography,
} from 'antd';
const { Text } = Typography;
import {
    InfoCircleOutlined,
    LoginOutlined,
    LogoutOutlined,
    SearchOutlined,
    SettingOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import LoginForm from '../features/authentication/LoginForm';
import { Link, useNavigate } from 'react-router-dom';
import RegisterForm from '../features/authentication/RegisterForm';
import ForgetPassword from '../features/authentication/ForgetPassword';
import CartButton from './CartButton';
import { useUser } from '../features/account/useUser';
import { useLogout } from '../features/authentication/useLogout';
import MessageButton from './MessageButton';

export default function HeaderContent() {
    const [openLogin, setOpenLogin] = useState(false);
    const [openReg, setOpenReg] = useState(false);
    const [openForget, setOpenForget] = useState(false);
    const navigate = useNavigate();

    const { user, isAuthenticated } = useUser();
    const { modal } = App.useApp();
    const { logout } = useLogout();
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
            onClick: handleOpenLogin,
        },
        {
            label: 'Register',
            key: '2',
            icon: <UserOutlined />,
            onClick: handleOpenReg,
        },
    ];

    function handleLogout() {
        modal.confirm({
            title: 'Are you sure to logout?',
            onOk: () => {
                logout();
            },
        });
    }
    function handleOpenLogin() {
        setOpenReg(false);
        setOpenLogin(true);
    }
    function handleOpenReg() {
        setOpenLogin(false);
        setOpenReg(true);
    }
    function handleForget() {
        setOpenLogin(false);
        setOpenReg(false);
        setOpenForget(true);
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
                        navigate(`/toys?toyname=${e.target.value}`);
                    }}
                />
            </Col>

            <Col span={5} offset={1}>
                <Space size='large'>
                    <MessageButton openLogin={handleOpenLogin} />
                    <CartButton openLogin={handleOpenLogin} />
                    <Dropdown
                        arrow
                        menu={{ items: isAuthenticated ? itemsWhenAuth : itemsWhenNotAuth }}
                        trigger={['click']}
                        placement='bottomRight'
                    >
                        <Button size='large' shape='circle' icon={<UserOutlined />} />
                    </Dropdown>
                </Space>
                <Text type='danger' className='ps-1'>
                    {isAuthenticated ? user.name : ''}
                </Text>
            </Col>
            <Modal
                maskClosable={false}
                title='Login to your account'
                footer={null}
                open={openLogin}
                onCancel={() => setOpenLogin(false)}
            >
                <LoginForm
                    openReg={handleOpenReg}
                    openForget={handleForget}
                    setOpenLogin={setOpenLogin}
                />
            </Modal>
            <Modal
                maskClosable={false}
                title='Register an account'
                footer={null}
                open={openReg}
                onCancel={() => setOpenReg(false)}
            >
                <RegisterForm openLogin={handleOpenLogin} setOpenReg={setOpenReg} />
            </Modal>
            <Modal
                maskClosable={false}
                title='Reset password'
                footer={null}
                open={openForget}
                onCancel={() => setOpenForget(false)}
            >
                <Alert description='We will send reset code to your email' type='info' />
                <ForgetPassword setOpenForget={setOpenForget} />
            </Modal>
        </Row>
    );
}
