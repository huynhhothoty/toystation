import { Card, Segmented, Spin } from 'antd';
import { useGetUserOrder } from './useGetUserOrder';
import { useEffect, useState } from 'react';

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

    console.log(filterOrder);
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
                <h1>{orderStatus}</h1>
            </Card>
        </>
    );
}
