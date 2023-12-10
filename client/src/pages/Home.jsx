import { Card, Carousel, Col, Image, Row, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
import { Link } from 'react-router-dom';
const { Title } = Typography;

export default function Home() {
    return (
        <>
            <Carousel autoplay autoplaySpeed={1500} className=''>
                <div>
                    <Link to='/product'>
                        <Image
                            preview={false}
                            className='w-[100%]'
                            src='/carousel.png'
                            alt='carousel'
                        />
                    </Link>
                </div>
                <div>
                    <Link to='/product'>
                        <Image
                            preview={false}
                            className='w-[100%]'
                            src='/carousel.png'
                            alt='carousel'
                        />
                    </Link>
                </div>
                <div>
                    <Link to='/product'>
                        <Image
                            preview={false}
                            className='w-[100%]'
                            src='/carousel.png'
                            alt='carousel'
                        />
                    </Link>
                </div>
            </Carousel>

            <Card className='mt-10'>
                <Title className='mb-10 text-center'>What are you looking for?</Title>
                <Row className='px-5' gutter={20}>
                    {Array.from({ length: 6 }, (v, i) => i).map((ele) => (
                        <Col key={ele} span={4}>
                            <Link to='/product'>
                                <Card
                                    hoverable
                                    cover={<Image preview={false} src='/sampleToy.png' />}
                                >
                                    <Meta title='Quiz' />
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Card>

            <Card className='mt-10'>
                <Title className='mb-10 text-center'>Best seller</Title>
                <Row className='px-5' gutter={20}>
                    <Col span={6}>
                        <Card hoverable cover={<img alt='toy' src='/sampleToy.png' />}>
                            <Meta title='Quiz' />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card hoverable cover={<img alt='toy' src='/sampleToy.png' />}>
                            <Meta title='Quiz' />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card hoverable cover={<img alt='toy' src='/sampleToy.png' />}>
                            <Meta title='Quiz' />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card hoverable cover={<img alt='toy' src='/sampleToy.png' />}>
                            <Meta title='Quiz' />
                        </Card>
                    </Col>
                </Row>
            </Card>
        </>
    );
}
