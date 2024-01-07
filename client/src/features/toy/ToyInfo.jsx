import { Button, Card, Divider, Spin, Tabs, Tooltip, Typography } from 'antd';
import { formatCurrency } from '../../utils/helpers';
import { useState } from 'react';
import NumCounter from '../../ui/NumCounter';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useUser } from '../account/useUser';
import { useChangeCart } from '../cart/useChangeCart';
const { Title, Text } = Typography;

export default function ToyInfo({ toy }) {
    const [numbers, setNumbers] = useState(1);
    const { user, isAuthenticated } = useUser();
    const { changeCart, isChanging } = useChangeCart();

    function handleAddToCart() {
        let isNewItem = true;
        const newCart = user.cart.map((ele) => {
            if (ele.item._id === toy._id) {
                isNewItem = false;
                return { ...ele, numbers: ele.numbers + numbers };
            } else {
                return ele;
            }
        });
        if (isNewItem) newCart.push({ numbers: numbers, item: toy._id });

        changeCart({ userId: user._id, newCart: newCart });
    }

    const items = [
        {
            key: '1',
            label: 'Summary',
            children: toy.description,
        },
        {
            key: '2',
            label: 'Info',
            children: 'Content of Tab Info',
        },
        {
            key: '3',
            label: 'Guide',
            children: 'Content of Tab Pane Guide',
        },
        {
            key: '4',
            label: 'Brand',
            children: toy.branch,
        },
    ];
    return (
        <Spin spinning={isChanging}>
            <Card>
                <Title>{toy.name}</Title>
                <Divider />
                <Text className='text-lg font-bold' type='success'>
                    {formatCurrency(toy.price)}
                </Text>
                <p className='text-sm italic'>{'*Remain: ' + toy.quantity}</p>
                <Divider />
                <NumCounter numbers={numbers} setNumbers={setNumbers} />
                <div className='mt-10'>
                    <Tooltip
                        placement='top'
                        title={
                            isAuthenticated ? 'Add this toy to my cart' : 'Please login to add cart'
                        }
                    >
                        <Button
                            disabled={!isAuthenticated}
                            onClick={() => handleAddToCart()}
                            type='primary'
                            size='large'
                            icon={<ShoppingCartOutlined />}
                        >
                            Add cart
                        </Button>
                    </Tooltip>
                </div>
                <Divider />
                <Tabs tabBarGutter={80} defaultActiveKey='1' items={items} centered />
            </Card>
        </Spin>
    );
}
