import { Button, Card, Col, Divider, Input, Row, Space, Table, Typography } from 'antd';
import {
    ArrowLeftOutlined,
    DeleteOutlined,
    MinusOutlined,
    MoneyCollectOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import ToyItem from '../features/toy/ToyItem';
const { Title, Text } = Typography;

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
    {
        title: 'Options',
        dataIndex: 'option',
        render: () => (
            <Space size='large'>
                <Space size='small'>
                    <Button icon={<MinusOutlined />} />
                    <Input className='w-[30px] text-center' defaultValue={1} />
                    <Button icon={<PlusOutlined />} />
                </Space>

                <Button danger icon={<DeleteOutlined />} />
            </Space>
        ),
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
        number: '2',
        name: 'Orange',
        quantity: '2',
        unit: '50k',
        total: '100k',
    },
];

export default function Cart() {
    return (
        <>
            <Row gutter={2} justify='space-between' align='middle'>
                <Col span={16}>
                    <Title className='text-center'>Your Cart</Title>
                    <Table columns={columns} dataSource={data} />

                    <Button className='' size='large' icon={<ArrowLeftOutlined />}>
                        Continue shopping
                    </Button>
                </Col>
                <Col span={6}>
                    <Card>
                        <Title className='text-center' level={3}>
                            Cart Information
                        </Title>
                        <Divider />
                        <div className='flex justify-between'>
                            <Text type='danger'>Total</Text>
                            <Text mark>99,99VND</Text>
                        </div>
                        <Divider />
                        <div className='flex justify-end'>
                            <Button size='large' type='primary' icon={<MoneyCollectOutlined />}>
                                Go to order page
                            </Button>
                        </div>
                    </Card>
                </Col>
            </Row>

            <Title className='mt-10 text-center'>You may like those</Title>
            <Divider />
            <Row justify='space-evenly' align='middle' gutter={1}>
                {Array.from({ length: 4 }, (v, i) => i).map((ele) => (
                    <ToyItem key={ele} span={5} />
                ))}
            </Row>
        </>
    );
}
