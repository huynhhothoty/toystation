import { Image, Layout, Menu } from 'antd';
const { Content, Sider } = Layout;
import {
    BarChartOutlined,
    ShoppingCartOutlined,
    TeamOutlined,
    ProfileOutlined,
} from '@ant-design/icons';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export default function AppLayoutAdmin() {
    const navigate = useNavigate();
    const location = useLocation();

    const items = [
        {
            key: 'dashboard',
            label: 'Dashboard',
            icon: <BarChartOutlined />,
            onClick: () => navigate('/admin/dashboard'),
        },
        {
            key: 'order',
            label: 'Order',
            icon: <ShoppingCartOutlined />,
            onClick: () => navigate('/admin/order'),
        },
        {
            key: 'product',
            label: 'Product',
            icon: <ProfileOutlined />,
            onClick: () => navigate('/admin/product'),
        },
        {
            key: 'account',
            label: 'Account',
            icon: <TeamOutlined />,
            onClick: () => navigate('/admin/account'),
        },
    ];
    function mapValueToKey(value) {
        const result = items.find((ele) => value.includes(ele.key))?.key ?? 'dashboard';
        return result;
    }
    return (
        <Layout hasSider>
            <Sider className='bottom-0 left-0 top-0 h-screen [position:fixed!important]'>
                <div className='p-3'>
                    <Image src='/textlogo.png' preview={false} />
                </div>
                <Menu
                    className='mt-5'
                    theme='dark'
                    mode='inline'
                    defaultSelectedKeys={[mapValueToKey(location.pathname)]}
                    items={items}
                />
            </Sider>
            <Layout className='ml-[200px]'>
                <Content className='min-h-screen p-8'>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}
