import {
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
            onClick: () => {
                setOpenLogin(true);
            },
        },
        {
            label: 'Register',
            key: '2',
            icon: <UserOutlined />,
        },
    ];
    const [openLogin, setOpenLogin] = useState(false);
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
                    className='border-2 border-black placeholder:tracking-wide'
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
                <LoginForm />
            </Modal>
        </Row>
    );
}
