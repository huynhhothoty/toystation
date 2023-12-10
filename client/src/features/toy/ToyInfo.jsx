import { MinusOutlined, PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Card, Divider, Input, Tabs, Typography } from 'antd';
const { Title, Text } = Typography;

const items = [
    {
        key: '1',
        label: 'Summary',
        children: 'Content of summary',
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

export default function ToyInfo() {
    return (
        <Card>
            <Title>Smart toy use to solve quiz Giiker</Title>
            <Divider />
            <Text>100,000 VND</Text>
            <Divider />
            <Button icon={<MinusOutlined />} />
            <Input className='w-[50px] text-center' defaultValue={1} />
            <Button icon={<PlusOutlined />} />
            <div className='mt-10'>
                <Button type='primary' size='large' icon={<ShoppingCartOutlined />}>
                    Add cart
                </Button>
            </div>
            <Divider />
            <Tabs tabBarGutter={80} defaultActiveKey='1' items={items} centered />
        </Card>
    );
}
