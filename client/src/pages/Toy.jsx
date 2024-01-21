import { Empty, Row, Spin } from 'antd';
import FilterProduct from '../features/product/FilterProduct';
import ToyItem from '../features/toy/ToyItem';
import { useToys } from '../features/toy/useToys';

export default function Toy() {
    const { toys, isLoading } = useToys();

    return (
        <div className='flex flex-col'>
            <div className='sticky top-1 z-50 mb-3 p-0'>
                <FilterProduct />
            </div>

            {toys?.length === 0 ? (
                <Empty description='No toy match your selection!' />
            ) : (
                <Row gutter={16} align={'middle'}>
                    {isLoading ? (
                        <Spin size='large' fullscreen />
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
