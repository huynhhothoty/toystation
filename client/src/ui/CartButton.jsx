import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge, Button, Popover } from 'antd';
import { Link } from 'react-router-dom';
import CartOverview from '../features/cart/CartOverview';
import { useUser } from '../features/account/useUser';

export default function CartButton() {
    const { user } = useUser();
    const cartLength = user?.cart.length ?? 0;
    return (
        <Popover
            placement='bottomRight'
            title='Cart overview'
            content={<CartOverview />}
            trigger='hover'
        >
            <Badge count={cartLength}>
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
    );
}
