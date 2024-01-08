import { SearchOutlined } from '@ant-design/icons';
import { Button, Card, Col, Flex, Image, Row, Spin, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
import { Link } from 'react-router-dom';
import { useToys } from '../features/toy/useToys';
import BannerCarousel from '../ui/BannerCarousel';
const { Title } = Typography;

export default function Home() {
    const { toys, isLoading } = useToys();

    // choose 6 first category
    const categoryList = toys?.reduce((acc, cur) => {
        if (cur.category && !acc.includes(cur.category) && acc.length < 6)
            return [...acc, cur.category];
        return acc;
    }, []);

    let toyOfCateList = [];
    categoryList?.forEach((ele) => {
        const temp = toys?.find((x) => x.category === ele);
        if (ele) toyOfCateList.push(temp);
    });

    if (isLoading) return <Spin fullscreen />;
    return (
        <>
            <BannerCarousel />

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
                <Row className='px-5' gutter={16}>
                    {toyOfCateList.map((ele) => (
                        <Col key={ele._id} span={4}>
                            <Link to='/toys'>
                                <Card className='border-green-200' hoverable>
                                    <Image
                                        height={200}
                                        width='100%'
                                        preview={false}
                                        src={ele.image}
                                    />
                                    <Meta className='text-center' title={ele.category} />
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Card>

            <Card className='mt-10'>
                <Title className='mb-10 text-center'>Best seller</Title>
                <Row className='px-5' gutter={24}>
                    {toyOfCateList?.slice(0, 4).map((ele) => (
                        <Col key={ele._id} span={6}>
                            <Link to='/toys'>
                                <Card className='border-red-200' hoverable>
                                    <Image
                                        height={300}
                                        width='100%'
                                        preview={false}
                                        src={ele.image}
                                    />
                                    <Meta className='text-center' title={ele.name} />
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Card>
        </>
    );
}
