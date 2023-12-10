import { Card, Radio, Space, Tabs } from 'antd';
import Title from 'antd/es/typography/Title';

function EWalletChoose() {
    return (
        <Radio.Group>
            <Space direction='vertical'>
                <Radio value={1}>MOMO</Radio>
            </Space>
        </Radio.Group>
    );
}

const items = [
    {
        key: '1',
        label: 'COD',
        children: 'You will purchase when order arrived by cash 💸',
    },
    {
        key: '2',
        label: 'E-Wallet',
        children: <EWalletChoose />,
    },
];

export default function PaymentMethod() {
    return (
        <Card>
            <Title level={3}>Payment Method</Title>
            <Tabs items={items} />
        </Card>
    );
}
