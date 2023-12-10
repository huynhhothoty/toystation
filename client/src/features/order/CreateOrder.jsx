import { Button, Space } from 'antd';
import Address from '../../ui/Address';
import OrderListItem from './OrderListItem';
import PaymentMethod from './PaymentMethod';
import Title from 'antd/es/typography/Title';
import Notes from './Notes';

export default function CreateOrder() {
    return (
        <div className='grid grid-flow-row gap-5'>
            <Address />
            <OrderListItem />
            <PaymentMethod />
            <Notes />

            <Space className='flex justify-between'>
                <Title level={4} style={{ color: 'red' }}>
                    👉 You purchase mean you accept with our policies
                </Title>

                <Button
                    danger
                    icon='💴'
                    size='large'
                    type='primary'
                    style={{
                        width: '200px',
                        height: '50px',
                    }}
                >
                    Purchase
                </Button>
            </Space>
        </div>
    );
}
