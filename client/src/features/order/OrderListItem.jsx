import { Card, Table } from 'antd';
import Title from 'antd/es/typography/Title';

const columns = [
    {
        title: 'Numbers',
        dataIndex: 'number',
        width: 100,
    },
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
    },
    {
        title: 'UnitPrice',
        dataIndex: 'unit',
    },
    {
        title: 'TotalPrice',
        dataIndex: 'total',
    },
];

const data = [
    {
        key: '1',
        number: '1',
        name: 'Snack X',
        quantity: '2',
        unit: '50k',
        total: '100k',
    },
    {
        key: '2',
        number: '2',
        name: 'Tomato',
        quantity: '2',
        unit: '50k',
        total: '100k',
    },
    {
        key: '3',
        number: '3',
        name: 'Orange',
        quantity: '2',
        unit: '50k',
        total: '100k',
    },
];

export default function OrderListItem() {
    return (
        <Card>
            <Title level={3}>Here is your item in cart</Title>
            <Table columns={columns} dataSource={data} />
        </Card>
    );
}
