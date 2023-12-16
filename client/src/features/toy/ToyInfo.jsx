import { Button, Card, Divider, Spin, Tabs, Typography } from 'antd';
import { formatCurrency } from '../../utils/helpers';
import { useState } from 'react';
import NumCounter from '../../ui/NumCounter';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useUser } from '../account/useUser';
import { useChangeCart } from '../cart/useChangeCart';
const { Title, Text } = Typography;

export default function ToyInfo({ toy }) {
    const [numbers, setNumbers] = useState(1);
    const { user } = useUser();
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
            children: 'Content of Tab Pane Brand',
        },
    ];
    return (
        <Spin spinning={isChanging}>
            <Card>
                <Title>{toy.name}</Title>
                <Divider />
                <Text type='success'>{formatCurrency(toy.price)}</Text>
                <Divider />
                <NumCounter numbers={numbers} setNumbers={setNumbers} />
                <div className='mt-10'>
                    <Button
                        onClick={() => handleAddToCart()}
                        type='primary'
                        size='large'
                        icon={<ShoppingCartOutlined />}
                    >
                        Add cart
                    </Button>
                </div>
                <Divider />
                <Tabs tabBarGutter={80} defaultActiveKey='1' items={items} centered />
            </Card>
        </Spin>
    );
}
