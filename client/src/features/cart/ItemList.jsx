import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Input, Popconfirm, Space, Table } from 'antd';
import { useUser } from '../account/useUser';
import { useChangeCart } from './useChangeCart';
import { formatCurrency } from '../../utils/helpers';

export default function ItemList({ editable = true }) {
    const { user, isLoading } = useUser();
    const { changeCart, isChanging } = useChangeCart();

    const currentCart = user?.cart;

    function updateNumberOfItem(itemId, newNumber) {
        const newCart = currentCart.map((ele) => {
            if (ele.item._id === itemId) return { ...ele, numbers: newNumber };
            else return ele;
        });
        changeCart({ userId: user._id, newCart: newCart });
    }

    function removeItem(itemId) {
        const newCart = currentCart.filter((ele) => ele.item._id !== itemId);
        changeCart({ userId: user._id, newCart: newCart });
    }

    const columns = [
        {
            title: 'Number',
            dataIndex: '_id',
            width: '10%',
            render: (_id, record, index) => {
                return index + 1;
            },
        },
        {
            title: 'Name',
            dataIndex: 'item',
            render: (item) => `${item.name}`,
        },
        {
            title: 'Quantity',
            dataIndex: 'numbers',
            width: '10%',
        },
        {
            title: 'Unit Price',
            dataIndex: 'item',
            render: (item) => `${formatCurrency(item.price)}`,
        },
        {
            title: 'Total Price',
            render: (ele) => `${formatCurrency(ele.item.price * ele.numbers)}`,
        },
    ];

    const editOption = {
        title: 'Options',
        render: (ele) => (
            <Space size='large'>
                <Space size='small'>
                    <Button
                        disabled={isChanging}
                        icon={<MinusOutlined />}
                        onClick={() => updateNumberOfItem(ele.item._id, ele.numbers - 1)}
                    />
                    <Input
                        className='w-[50px] text-center'
                        disabled
                        value={ele.numbers}
                        onPressEnter={(e) => updateNumberOfItem(ele.item._id, e.target.value * 1)}
                    />
                    <Button
                        disabled={isChanging}
                        icon={<PlusOutlined />}
                        onClick={() => updateNumberOfItem(ele.item._id, ele.numbers + 1)}
                    />
                </Space>

                <Popconfirm
                    title='Delete this item?'
                    description='Are you sure remove this from your cart?'
                    onConfirm={() => removeItem(ele.item._id)}
                >
                    <Button danger icon={<DeleteOutlined />} />
                </Popconfirm>
            </Space>
        ),
    };
    if (editable) columns.push(editOption);
    return (
        <Table
            columns={columns}
            dataSource={user?.cart}
            loading={isLoading || isChanging}
            rowKey={(record) => record.item._id}
        />
    );
}
