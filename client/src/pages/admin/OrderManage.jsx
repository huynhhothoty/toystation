import { App, Button, Card, Flex, Input, Segmented, Space, Table, Tooltip } from 'antd';
import { useOrder } from '../../features/admin/order/useOrder';
import { format as formatDate } from 'date-fns';
import { formatCurrency } from '../../utils/helpers';
import { CheckCircleOutlined, InfoCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Link, useSearchParams } from 'react-router-dom';
import RenderStatusTag from '../../features/admin/order/RenderStatusTag';
import useChangeOrder from '../../features/admin/order/useChangeOrder';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import RefreshButton from '../../ui/RefreshButton';

function getSearchPropsInTable(dataIndex) {
    return {
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div className='p-3'>
                <Input
                    prefix={<SearchOutlined />}
                    placeholder='Search toy name'
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                />
                <Flex gap={10} justify='end' align='center' className='mt-3'>
                    <Button size='small' onClick={() => clearFilters()}>
                        Reset
                    </Button>
                    <Button
                        size='small'
                        type='primary'
                        onClick={() => {
                            confirm();
                        }}
                    >
                        OK
                    </Button>
                </Flex>
            </div>
        ),
        filterIcon: <SearchOutlined />,
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    };
}

export default function OrderManage() {
    const { order, isGettingOrder } = useOrder();
    const queryClient = useQueryClient();
    const { modal } = App.useApp();
    const { changeOrder, isChangingOrder } = useChangeOrder();
    const [searchParams, setSearchParams] = useSearchParams();

    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 6,
        },
    });

    function handleChangeStatus(orderId) {
        modal.confirm({
            title: 'Complete this order?',
            onOk: () =>
                changeOrder(
                    { orderId, data: { status: 'completed' } },
                    { onSuccess: () => queryClient.invalidateQueries(['order']) }
                ),
        });
    }
    const columns = [
        {
            title: 'Create Time',
            dataIndex: 'createdAt',
            width: '15%',
            render: (ele) => formatDate(ele, 'HH:mm, dd/MM/yyyy'),
        },
        {
            title: 'Order code',
            dataIndex: '_id',
            width: '20%',
            ...getSearchPropsInTable('_id'),
        },
        {
            title: 'Price',
            dataIndex: 'totalPrice',
            width: '10%',
            render: (ele) => <p className='font-semibold text-green-500'>{formatCurrency(ele)}</p>,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            width: '30%',
            key: 'address',
            ...getSearchPropsInTable('address'),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            width: '10%',
            render: (ele) => <RenderStatusTag status={ele} />,
        },
        {
            title: 'Option',
            render: (ele) => (
                <Space>
                    <Tooltip title='Complete this order'>
                        <Button
                            disabled={['completed', 'failed'].includes(ele.status)}
                            onClick={() => handleChangeStatus(ele._id)}
                        >
                            <CheckCircleOutlined />
                        </Button>
                    </Tooltip>
                    <Tooltip title='View order information'>
                        <Link to={`/admin/order/${ele._id}`}>
                            <Button>
                                <InfoCircleOutlined />
                            </Button>
                        </Link>
                    </Tooltip>
                </Space>
            ),
        },
    ];

    function handleOnChange(value) {
        console.log(value);
        searchParams.set('status', value);
        setSearchParams(searchParams);
    }

    return (
        <>
            <h1 className='mb-3'>Manage Customer Order</h1>
            <Card>
                <Flex justify='end' align='center' gap={10}>
                    <RefreshButton />
                    <Segmented
                        size='large'
                        defaultValue={searchParams.get('status') ?? 'all'}
                        onChange={(value) => handleOnChange(value)}
                        options={[
                            { label: 'All', value: 'all' },
                            { label: 'Unconfirmed', value: 'unconfirmed' },
                            { label: 'On going', value: 'on-going' },
                            { label: 'Success', value: 'completed' },
                            { label: 'Failed', value: 'failed' },
                        ]}
                    />
                </Flex>
            </Card>
            <Table
                onChange={(pagination) => setTableParams({ pagination })}
                pagination={tableParams.pagination}
                rowKey={(ele) => ele._id}
                loading={isGettingOrder || isChangingOrder}
                dataSource={order}
                columns={columns}
            />
        </>
    );
}
