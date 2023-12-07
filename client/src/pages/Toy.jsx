import { Button, Card, Col, Row, Typography } from 'antd';
import FilterProduct from '../features/product/FilterProduct';
import Meta from 'antd/es/card/Meta';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Title } = Typography;

export default function Toy() {
    return (
        <div className='flex flex-col'>
            <Title className='mb-5'>Filter</Title>
            <div className='sticky top-1 z-50 p-2'>
                <FilterProduct />
            </div>

            <Title className='my-5'>Product</Title>
            <Row justify='space-evenly' gutter={4}>
                {Array.from({ length: 24 }, (value, index) => index).map((ele) => (
                    <Col key={ele} span={5} className='mb-5'>
                        <Card hoverable cover={<img alt='toy' src='/sampleToy.png' />}>
                            <Meta title='Giiker toy' description='100k' />
                            <div className='mt-5 flex justify-between'>
                                <Link to='/product/detailsometoy'>
                                    <Button icon={<EyeOutlined />}>Detail</Button>
                                </Link>
                                <Button icon={<ShoppingCartOutlined />}>Add cart</Button>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}
