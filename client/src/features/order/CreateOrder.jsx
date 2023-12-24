import { App, Button, Space, Spin } from 'antd';
import Address from '../../ui/Address';
import OrderListItem from './OrderListItem';

import { formatCurrency } from '../../utils/helpers';
import { useUser } from '../account/useUser';
import { useCreateOrder } from './useCreateOrder';
import { loadingMsg } from '../../utils/messages';
import { useNavigate } from 'react-router-dom';

export default function CreateOrder() {
    const { modal } = App.useApp();
    const { user, isLoading } = useUser();
    const { createOrder, isCreatingOrder } = useCreateOrder();
    const navigate = useNavigate();

    const currentCart = user?.cart;
    const sumPrice = currentCart?.reduce((sum, cur) => (sum += cur.item.price * cur.numbers), 0);
    const handleCreateOrder = () => {
        modal.confirm({
            title: 'Create Order',
            content: (
                <p>
                    Please check your information carefully and ensure that you accept our policies
                </p>
            ),
            onOk: () => {
                const idItemListCart = user.cart.map((ele) => ele.item._id);
                createOrder(
                    { userId: user._id, cart: idItemListCart, address: user.address },
                    { onSuccess: () => navigate('/') }
                );
            },
        });
    };
    return (
        <div className='grid grid-flow-row gap-5'>
            <Spin spinning={isLoading || isCreatingOrder} tip={loadingMsg}>
                <Address address={user?.address} userName={user?.name} />
                <OrderListItem />

                <Space className='mt-8 flex items-center justify-between'>
                    <h2 className='text-red-500'>
                        👉 You purchase mean you accept with our policies
                    </h2>

                    <Space size='large'>
                        <h1>
                            Total Price:
                            <span className='ml-2 font-bold text-red-600'>
                                {formatCurrency(sumPrice)}
                            </span>
                        </h1>
                        <Button
                            danger
                            icon='💴'
                            type='primary'
                            className='h-14 px-11 text-2xl tracking-wider'
                            onClick={handleCreateOrder}
                        >
                            Purchase
                        </Button>
                    </Space>
                </Space>
            </Spin>
        </div>
    );
}
