import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge, Button, Popover } from 'antd';
import { Link } from 'react-router-dom';
import CartOverview from '../features/cart/CartOverview';
import { useUser } from '../features/account/useUser';

export default function CartButton({ openLogin }) {
    const { user, isAuthenticated } = useUser();
    const cartLength = user?.cart?.length ?? 0;

    return (
        <Popover placement='bottomRight' title='Cart overview' content={<CartOverview />}>
            <Badge count={cartLength}>
                {isAuthenticated ? (
                    <Link to='/cart'>
                        <Button size='large' shape='circle' icon={<ShoppingCartOutlined />} />
                    </Link>
                ) : (
                    <Button
                        onClick={() => openLogin()}
                        className='border-2 border-black'
                        size='large'
                        shape='circle'
                        icon={<ShoppingCartOutlined />}
                    />
                )}
            </Badge>
        </Popover>
    );
}
