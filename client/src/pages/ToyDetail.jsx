import { Card, Carousel, Col, Row } from 'antd';
import ToyInfo from '../features/toy/ToyInfo';
import ToyItem from '../features/toy/ToyItem';

export default function ToyDetail() {
    return (
        <>
            <Row justify='space-between'>
                <Col span={12} className='ml-4'>
                    <Card>
                        <Carousel autoplay autoplaySpeed={1000} dotPosition='bottom'>
                            <div className='bg-red-50'>
                                <img src='/toy1.png' className='max-w-[100%] ' />
                            </div>
                            <div className='bg-red-50'>
                                <img src='/toy1.png' className='max-w-[100%]' />
                            </div>
                            <div className='bg-red-50'>
                                <img src='/toy1.png' className='max-w-[100%]' />
                            </div>
                        </Carousel>
                    </Card>
                </Col>
                <Col span={11}>
                    <ToyInfo />
                </Col>
            </Row>

            <h1 className='mb-5 mt-20 text-center'>Relevant toy</h1>
            <Row justify='space-evenly' gutter={4}>
                {Array.from({ length: 4 }, (value, index) => index).map((ele) => (
                    <ToyItem key={ele} span={5} />
                ))}
            </Row>
        </>
    );
}
