import { Carousel, Col, Row } from 'antd';
import ToyInfo from '../features/toy/ToyInfo';

export default function ToyDetail() {
    return (
        <>
            <Row justify='space-between'>
                <Col span={11} className='ml-4'>
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
                </Col>
                <Col span={10}>
                    <ToyInfo />
                </Col>
            </Row>

            <h1 className='mb-5 mt-20 text-center'>Relevant toy</h1>
        </>
    );
}
