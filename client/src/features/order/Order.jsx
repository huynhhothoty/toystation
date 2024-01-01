import { Card, Segmented, Spin } from 'antd';
import { useGetUserOrder } from './useGetUserOrder';
import { useEffect, useState } from 'react';
import OrderTrackingItem from './OrderTrackingItem';

// ['unconfirmed', 'on-going', 'completed', 'failed']

export default function Order() {
    const { userOrder, isGettingOrder } = useGetUserOrder();
    const [orderStatus, setOrderStatus] = useState('unconfirmed');
    const [filterOrder, setFilterOrder] = useState([]);

    useEffect(
        function () {
            setFilterOrder(userOrder?.filter((ele) => ele.status === orderStatus));
        },
        [userOrder, orderStatus]
    );

    if (isGettingOrder) return <Spin fullscreen />;

    return (
        <>
            <Card className='mb-4'>
                <Segmented
                    onChange={setOrderStatus}
                    value={orderStatus}
                    options={[
                        { label: 'Unconfirmed', value: 'unconfirmed' },
                        { label: 'On Going', value: 'on-going' },
                        { label: 'Completed', value: 'completed' },
                        { label: 'Failed', value: 'failed' },
                    ]}
                />
            </Card>

            <Card>
                {filterOrder?.map((ele) => (
                    <Card key={ele._id} className='mb-5'>
                        <OrderTrackingItem order={ele} />
                    </Card>
                ))}
            </Card>
        </>
    );
}
