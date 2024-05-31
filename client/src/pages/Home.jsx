import { SearchOutlined } from '@ant-design/icons';
import { Button, Card, Col, Flex, Image, Row, Spin, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
import { Link } from 'react-router-dom';
import BannerCarousel from '../ui/BannerCarousel';
import { useAllToys } from '../features/toy/useAllToys';
import { useGetFilterInfo } from '../hooks/useGetFilterInfo';
const { Title } = Typography;

export default function Home() {
    const { toys, isLoading } = useAllToys();

    // choose 6 first category
    const { categoryList } = useGetFilterInfo();

    let toyOfCateList = [];
    categoryList?.forEach((ele) => {
        const temp = toys?.find((x) => x.category === ele);
        if (ele) toyOfCateList.push(temp);
    });

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

            <Card className='mt-10  '>
                <Title className='mb-10 text-center'>What are you looking for?</Title>
                <Spin spinning={isLoading}>
                    <Row className='overflow-x-auto px-5' gutter={16} wrap={false}>
                        {toyOfCateList.map((ele) => (
                            <Col key={ele?._id} lg={4} md={6} sm={8} xs={12}>
                                <Card className='my-6 border-green-200' hoverable>
                                    <Link to={`/toys?category=${ele.category}`}>
                                        <Image
                                            height={200}
                                            width='100%'
                                            preview={false}
                                            src={ele?.image}
                                        />
                                        <Meta className='text-center' title={ele?.category} />
                                    </Link>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Spin>
            </Card>

            <Card className='mt-10'>
                <Title className='mb-10 text-center'>Best seller</Title>
                <Spin spinning={isLoading}>
                    <Row className='overflow-x-auto px-5' gutter={24}>
                        {toyOfCateList?.slice(0, 4).map((ele) => (
                            <Col key={ele?._id} lg={6} md={8} sm={12}>
                                <Card className='my-3 border-red-200' hoverable>
                                    <Link to={`/toys?name=${ele.name}`}>
                                        <Image
                                            height={300}
                                            width='100%'
                                            preview={false}
                                            src={ele?.image}
                                        />
                                        <Meta className='text-center' title={ele?.name} />
                                    </Link>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Spin>
            </Card>
        </>
    );
}
