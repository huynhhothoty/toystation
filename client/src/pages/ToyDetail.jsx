import { Card, Carousel, Col, Image, Row, Spin, Typography } from 'antd';
import { useToyDetail } from '../features/toy/useToyDetail';
import ToyInfo from '../features/toy/ToyInfo';
const { Title } = Typography;

export default function ToyDetail() {
    const { toyDetail, isLoading } = useToyDetail();

    return (
        <>
            {isLoading ? (
                <Spin />
            ) : (
                <Row justify='space-between'>
                    <Col span={12} className='ml-4'>
                        <Card>
                            <Carousel autoplay autoplaySpeed={1000} dotPosition='bottom'>
                                <div className='bg-red-50'>
                                    <Image src={toyDetail?.image} className='max-w-[100%] ' />
                                </div>
                            </Carousel>
                        </Card>
                    </Col>
                    <Col span={11}>
                        <ToyInfo toy={toyDetail} />
                    </Col>
                </Row>
            )}

            <Title level={1} className='mb-5 mt-20 text-center'>
                Relevant toy
            </Title>
            {/* <Row justify='space-evenly' gutter={4}>
                {Array.from({ length: 4 }, (value, index) => index).map((ele) => (
                    <ToyItem key={ele} span={5} />
                ))}
            </Row> */}
        </>
    );
}
