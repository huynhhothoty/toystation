import { Card } from 'antd';
import Title from 'antd/es/typography/Title';
import ItemList from '../cart/ItemList';

export default function OrderListItem() {
    return (
        <Card>
            <Title level={3}>Here is your item in cart</Title>
            <ItemList editable={false} />
        </Card>
    );
}
