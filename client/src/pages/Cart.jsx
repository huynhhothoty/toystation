import { Button, Card, Col, Divider, Row, Spin, Typography } from 'antd';
import { ArrowLeftOutlined, MoneyCollectOutlined } from '@ant-design/icons';
import { formatCurrency } from '../utils/helpers';
import { useUser } from '../features/account/useUser';
import { Link } from 'react-router-dom';
import ItemList from '../features/cart/ItemList';
const { Title, Text } = Typography;

export default function Cart() {
    const { user, isLoading } = useUser();

    const currentCart = user?.cart;
    const sumPrice = currentCart?.reduce((sum, cur) => (sum += cur.item.price * cur.numbers), 0);

    return (
        <>
            <Spin spinning={isLoading} fullscreen />
            <Row gutter={2} justify='space-between' align='middle'>
                <Col span={16}>
                    <Title className='text-center'>Your Cart</Title>

                    <ItemList editable={true} />

                    <Link to='/toys'>
                        <Button size='large' icon={<ArrowLeftOutlined />}>
                            Continue shopping
                        </Button>
                    </Link>
                </Col>
                <Col span={6}>
                    <Card>
                        <Title className='text-center' level={3}>
                            Cart Information
                        </Title>
                        <Divider />
                        <div className='flex justify-between'>
                            <Text type='danger'>Total</Text>
                            <Text strong className='text-xl' mark>
                                {formatCurrency(sumPrice)}
                            </Text>
                        </div>
                        <Divider />
                        <div className='flex justify-end'>
                            <Link to='/order'>
                                <Button size='large' type='primary' icon={<MoneyCollectOutlined />}>
                                    Order now!
                                </Button>
                            </Link>
                        </div>
                    </Card>
                </Col>
            </Row>

            <Title className='mt-10 text-center'>You may like those</Title>
            <Divider />
            {/* <Row justify='space-evenly' align='middle' gutter={1}>
                {Array.from({ length: 4 }, (v, i) => i).map((ele) => (
                    <ToyItem key={ele} span={5} />
                ))}
            </Row> */}
        </>
    );
}
