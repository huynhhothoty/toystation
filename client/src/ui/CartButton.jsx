import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge, Button, Empty, Popover } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import CartOverview from '../features/cart/CartOverview';
import { useUser } from '../features/account/useUser';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

function CartButtonWhenLogin() {
    const { user } = useUser();
    const cartLength = user?.cart?.length ?? 0;

    return (
        <Popover placement='bottomRight' title='Cart overview' content={<CartOverview />}>
            <Badge count={cartLength}>
                <Link to='/cart'>
                    <Button size='large' shape='circle' icon={<ShoppingCartOutlined />} />
                </Link>
            </Badge>
        </Popover>
    );
}

export default function CartButton() {
    const [name] = useLocalStorageState(null, 'name');
    const navigate = useNavigate();

    if (!name)
        return (
            <Popover
                placement='bottomRight'
                title='Cart overview'
                content={<Empty description='Please login to inspect your cart' />}
            >
                <Button
                    onClick={() => navigate('/login')}
                    size='large'
                    shape='circle'
                    icon={<ShoppingCartOutlined />}
                />
            </Popover>
        );

    return <CartButtonWhenLogin />;
}
