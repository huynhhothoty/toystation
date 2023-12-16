import { Empty, Row, Spin, Typography } from 'antd';
import FilterProduct from '../features/product/FilterProduct';
import ToyItem from '../features/toy/ToyItem';
import { useToys } from '../features/toy/useToys';
const { Title } = Typography;

export default function Toy() {
    const { toys, isLoading } = useToys();
    return (
        <div className='flex flex-col'>
            <Title className='mb-5'>Filter</Title>
            <div className='sticky top-1 z-50 p-0'>
                <FilterProduct />
            </div>

            <Title className='my-5'>Product</Title>
            {toys?.length === 0 ? (
                <Empty description='No toy match your selection!' />
            ) : (
                <Row gutter={16}>
                    {isLoading ? (
                        <Spin size='large' />
                    ) : toys.length > 0 ? (
                        toys.map((toy) => <ToyItem key={toy._id} span={6} toy={toy} />)
                    ) : (
                        <div className='flex items-center justify-center'>
                            <Empty description='No toy match your selection!' />
                        </div>
                    )}
                </Row>
            )}
        </div>
    );
}
