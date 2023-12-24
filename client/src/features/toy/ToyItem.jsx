import { InfoCircleOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Card, Col, Spin, Tooltip, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/helpers';
import { useUser } from '../account/useUser';
import { useChangeCart } from '../cart/useChangeCart';
const { Title, Text } = Typography;

export default function ToyItem({ span, toy }) {
    const { user, isAuthenticated } = useUser();
    const { changeCart, isChanging } = useChangeCart();

    function handleAddToCart() {
        let isNewItem = true;
        const newCart = user?.cart.map((ele) => {
            if (ele.item._id === toy._id) {
                isNewItem = false;
                return { ...ele, numbers: ele.numbers + 1 };
            } else {
                return ele;
            }
        });
        if (isNewItem) newCart.push({ numbers: 1, item: toy._id });

        changeCart({ userId: user._id, newCart: newCart });
    }

    return (
        <Col span={span} className='mb-5'>
            <Spin spinning={isChanging}>
                <Card hoverable cover={<img alt='toy' src={toy.image} />}>
                    <Title className='text-center' level={5}>
                        {toy.name}
                    </Title>
                    <div className='flex justify-center'>
                        <Text strong style={{ textAlign: 'center' }} type='success'>
                            {formatCurrency(toy.price)}
                        </Text>
                    </div>

                    <div className='mt-5 flex justify-between'>
                        <Link to={`/toys/${toy._id}`}>
                            <Button icon={<InfoCircleOutlined />}>Detail</Button>
                        </Link>
                        <Tooltip
                            placement='top'
                            title={
                                isAuthenticated
                                    ? 'Add this toy to my cart'
                                    : 'Please login to add cart'
                            }
                        >
                            <Button
                                disabled={!isAuthenticated}
                                onClick={() => handleAddToCart()}
                                icon={<ShoppingCartOutlined />}
                            >
                                Add
                            </Button>
                        </Tooltip>
                    </div>
                </Card>
            </Spin>
        </Col>
    );
}
