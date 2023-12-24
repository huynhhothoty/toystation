import { SearchOutlined } from '@ant-design/icons';
import { Button, Card, Carousel, Col, Flex, Image, Row, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
import { Link } from 'react-router-dom';
const { Title } = Typography;

export default function Home() {
    return (
        <>
            <Carousel autoplay autoplaySpeed={1500} className=''>
                <div>
                    <Link to='/toys'>
                        <Image
                            preview={false}
                            className='w-[100%]'
                            src='/carousel.png'
                            alt='carousel'
                        />
                    </Link>
                </div>
                <div>
                    <Link to='/toys'>
                        <Image
                            preview={false}
                            className='w-[100%]'
                            src='/carousel2.png'
                            alt='carousel'
                        />
                    </Link>
                </div>
                <div>
                    <Link to='/toys'>
                        <Image
                            preview={false}
                            className='w-[100%]'
                            src='/carousel3.png'
                            alt='carousel'
                        />
                    </Link>
                </div>
            </Carousel>

            <Flex justify='center' align='center' className='mt-7'>
                <Link to='/toys'>
                    <Button
                        style={{
                            color: 'white',
                        }}
                        icon={<SearchOutlined />}
                        className='h-16 animate-bounce rounded-full border-none bg-[#f47d16] px-9 text-2xl tracking-wider text-slate-50 outline-none ring-4 ring-yellow-100 hover:bg-orange-400'
                    >
                        Explore now!
                    </Button>
                </Link>
            </Flex>

            <Card className='mt-10'>
                <Title className='mb-10 text-center'>What are you looking for?</Title>
                <Row className='px-5' gutter={20}>
                    {Array.from({ length: 6 }, (v, i) => i).map((ele) => (
                        <Col key={ele} span={4}>
                            <Link to='/toys'>
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
