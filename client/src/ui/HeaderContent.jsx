import {
    Alert,
    Badge,
    Button,
    Col,
    Dropdown,
    Empty,
    Image,
    Input,
    Modal,
    Popover,
    Row,
    Space,
} from 'antd';
import {
    InfoCircleOutlined,
    LoginOutlined,
    LogoutOutlined,
    SearchOutlined,
    SettingOutlined,
    ShoppingCartOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import LoginForm from '../features/authentication/LoginForm';
import { Link } from 'react-router-dom';
import RegisterForm from '../features/authentication/RegisterForm';
import ForgetPassword from '../features/authentication/ForgetPassword';

const items = [
    {
        label: 'Account',
        key: '1',
        icon: <SettingOutlined />,
    },
    {
        label: 'History',
        key: '2',
        icon: <InfoCircleOutlined />,
    },
    {
        type: 'divider',
    },
    {
        label: 'Logout',
        key: '3',
        icon: <LogoutOutlined />,
        danger: true,
    },
];

export default function HeaderContent() {
    const items2 = [
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
    const [openLogin, setOpenLogin] = useState(false);
    const [openReg, setOpenReg] = useState(false);
    const [openForget, setOpenForget] = useState(false);
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
            <Col span={8} offset={2}>
                <Input
                    prefix={<SearchOutlined />}
                    className='rounded-full border-2 border-black placeholder:tracking-wide'
                    placeholder='Explore some wonderful toys...'
                    size='large'
                />
            </Col>

            <Col span={3} offset={3}>
                <Space size='large'>
                    <Popover
                        placement='bottomRight'
                        title='Cart overview'
                        content={<Empty />}
                        trigger='hover'
                    >
                        <Badge count={99}>
                            <Link to='/cart'>
                                <Button
                                    className='border-2 border-black'
                                    size='large'
                                    shape='circle'
                                    icon={<ShoppingCartOutlined />}
                                />
                            </Link>
                        </Badge>
                    </Popover>
                    <Dropdown
                        arrow
                        menu={{ items: items2 }}
                        trigger={['click']}
                        placement='bottomRight'
                    >
                        <Button
                            className='border-2 border-black'
                            size='large'
                            shape='circle'
                            icon={<UserOutlined />}
                        />
                    </Dropdown>
                </Space>
            </Col>
            <Modal
                title='Login to your account'
                footer={null}
                open={openLogin}
                onCancel={() => setOpenLogin(false)}
            >
                <LoginForm openReg={handleOpenReg} openForget={handleForget} />
            </Modal>
            <Modal
                title='Register an account'
                footer={null}
                open={openReg}
                onCancel={() => setOpenReg(false)}
            >
                <RegisterForm openLogin={handleOpenLogin} />
            </Modal>
            <Modal
                title='Reset password'
                footer={null}
                open={openForget}
                onCancel={() => setOpenForget(false)}
            >
                <Alert description='We will send reset code to your email' type='info' />
                <ForgetPassword />
            </Modal>
        </Row>
    );
}
