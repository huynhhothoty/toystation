import { Button, Card, Flex, Image, Input, Modal, Space, Table, Tooltip } from 'antd';
import { EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useToys } from '../../features/toy/useToys';
import { formatCurrency } from '../../utils/helpers';
import { useState } from 'react';
import ProductDetailForm from '../../features/admin/product/ProductDetailForm';
import ProductAddForm from '../../features/admin/product/ProductAddForm';
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

export default function ProductManage() {
    const { toys, isLoading } = useToys();
    const [openForm, setOpenForm] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 5,
        },
    });

    const columns = [
        {
            title: 'Product code',
            dataIndex: '_id',
            width: '17%',
            render: (ele) => <p className='text-red-400'>{ele}</p>,
            ...getSearchPropsInTable('_id'),
        },
        {
            title: 'Image',
            dataIndex: 'image',
            width: '6%',
            render: (ele) => <Image className='' src={ele} />,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            width: '25%',
            render: (ele) => <p className='font-bold'>{ele}</p>,
            ...getSearchPropsInTable('name'),
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            width: '10%',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            width: '12%',
            render: (ele) => <p className='font-semibold text-green-500'>{formatCurrency(ele)}</p>,
        },
        {
            title: 'Branch',
            dataIndex: 'branch',
            width: '15%',
            ...getSearchPropsInTable('branch'),
        },
        {
            title: 'Option',
            render: (ele) => (
                <Space>
                    <Tooltip title='View more information and edit'>
                        <Button
                            onClick={() => {
                                setCurrentId(ele._id);
                                setOpenForm(() => true);
                            }}
                        >
                            <EditOutlined />
                        </Button>
                    </Tooltip>
                </Space>
            ),
        },
    ];
    return (
        <>
            <h1>Product Manage</h1>
            <Card className='mb-2 mt-5'>
                <Flex justify='end' align='center' gap={10}>
                    <RefreshButton />
                    <Button
                        onClick={() => setOpenAdd(true)}
                        className='border-[white!important] bg-green-400 font-semibold hover:[color:white!important]'
                        size='large'
                        icon={<PlusOutlined />}
                    >
                        Add new product
                    </Button>
                </Flex>
            </Card>
            <Table
                rowKey={(ele) => ele._id}
                dataSource={toys}
                columns={columns}
                loading={isLoading}
                pagination={tableParams.pagination}
                onChange={(pagination) => setTableParams({ pagination })}
            />
            <Modal
                destroyOnClose
                width={580}
                centered
                title='Edit product information'
                footer={null}
                open={openForm}
                onCancel={() => setOpenForm(false)}
            >
                <ProductDetailForm setOpenForm={setOpenForm} toyId={currentId} />
            </Modal>
            <Modal
                destroyOnClose
                width={580}
                centered
                title='Add new product'
                footer={null}
                open={openAdd}
                onCancel={() => setOpenAdd(false)}
            >
                <ProductAddForm setOpenAdd={setOpenAdd} />
            </Modal>
        </>
    );
}
