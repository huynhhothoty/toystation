import { Alert, App, Button, Card, Col, Flex, Row, Select, Space, Spin, Table } from 'antd';
import { useOrderDetail } from './useOrderDetail';
import { formatCurrency } from '../../../utils/helpers';
import RenderStatusTag from './RenderStatusTag';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import useChangeOrder from './useChangeOrder';

function nextStatus(status) {
    if (status === 'unconfirmed') return 'on-going';
    if (status === 'on-going') return 'success';
}

const columns = [
    {
        title: 'Number',
        render: (_id, record, index) => {
            return index + 1;
        },
    },
    {
        title: 'Name',
        dataIndex: 'item',
        render: (ele) => ele.name,
    },
    {
        title: 'Quantity',
        dataIndex: 'numbers',
    },
    {
        title: 'Unit price',
        dataIndex: 'item',
        render: (ele) => <p className='text-blue-500-500'>{formatCurrency(ele.price)}</p>,
    },
    {
        title: 'Total price',
        render: (ele) => (
            <p className='text-green-500'>{formatCurrency(ele.numbers * ele.item.price)}</p>
        ),
    },
];

export default function OrderDetail() {
    const navigate = useNavigate();
    const { orderId } = useParams();
    const { modal } = App.useApp();
    const { orderDetail, isGettingOrderDetail } = useOrderDetail();
    const { changeOrder, isChangingOrder } = useChangeOrder();
    function handleChangeStatus() {
        modal.confirm({
            title: 'Move this order to next stage?',
            onOk: () =>
                changeOrder(
                    { orderId, data: { status: nextStatus(orderDetail.status) } },
                    { onSuccess: () => navigate(-1) }
                ),
        });
    }
    if (isGettingOrderDetail) return <Spin size='large' fullscreen />;
    return (
        <Spin spinning={isChangingOrder}>
            <h1>Order Information</h1>
            <Card>
                <Row>
                    <Col span={21}>
                        <div>
                            <h2 className='font-semibold text-red-500'>
                                Address: {orderDetail.address}
                            </h2>
                            <h2 className='font-semibold text-green-500'>
                                Username: {orderDetail.user.name}
                            </h2>
                            <h2 className='font-semibold text-blue-500'>
                                Price: {formatCurrency(orderDetail.totalPrice)}
                            </h2>
                        </div>
                    </Col>
                    <Col span={3} className='flex items-center justify-center'>
                        <RenderStatusTag className status={orderDetail.status} />
                    </Col>
                </Row>
            </Card>
            <Card>
                <Table
                    rowKey={(list) => list.item._id}
                    columns={columns}
                    dataSource={orderDetail.listSnapshot}
                />
            </Card>
            <Alert description='By default, CHANGE STATUS will go to next stage of order' />
            <Card>
                <Flex justify='space-between'>
                    <Link to='/admin/order'>
                        <Button size='large' icon={<ArrowLeftOutlined />}>
                            Return
                        </Button>
                    </Link>
                    <Space>
                        <Button
                            disabled={['completed', 'failed'].includes(orderDetail.status)}
                            type='primary'
                            size='large'
                            icon={<DoubleRightOutlined />}
                            onClick={handleChangeStatus}
                        >
                            Change status
                        </Button>
                        <Select
                            popupMatchSelectWidth={false}
                            size='large'
                            defaultValue={nextStatus(orderDetail.status) || orderDetail.status}
                            options={[
                                { label: 'Unconfirmed', value: 'unconfirmed' },
                                { label: 'On going', value: 'on-going' },
                                { label: 'Success', value: 'completed' },
                                { label: 'Failed', value: 'failed' },
                            ]}
                        />
                    </Space>
                </Flex>
            </Card>
        </Spin>
    );
}
