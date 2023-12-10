import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Card, Col } from 'antd';
import Meta from 'antd/es/card/Meta';
import { Link } from 'react-router-dom';

export default function ToyItem({ span }) {
    return (
        <Col span={span} className='mb-5'>
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
    );
}
