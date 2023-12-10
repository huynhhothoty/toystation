import { Row, Typography } from 'antd';
import FilterProduct from '../features/product/FilterProduct';
import ToyItem from '../features/toy/ToyItem';
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
                    <ToyItem key={ele} span={5} />
                ))}
            </Row>
        </div>
    );
}
