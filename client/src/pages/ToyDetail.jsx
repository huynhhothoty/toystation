import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Card, Col, Image, Row, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import ToyInfo from '../features/toy/ToyInfo';
import { useToyDetail } from '../features/toy/useToyDetail';

export default function ToyDetail() {
    const { toyDetail, isLoading } = useToyDetail();
    const navigate = useNavigate();

    return (
        <>
            <Button
                className='mb-4 ml-4'
                type='primary'
                size='large'
                onClick={() => navigate(-1)}
                icon={<ArrowLeftOutlined />}
            >
                Back
            </Button>
            {isLoading ? (
                <Spin />
            ) : (
                <Row justify='space-between' align='middle'>
                    <Col span={12} className='ml-4'>
                        <Card>
                            <div className='flex items-center justify-center bg-red-50'>
                                <Image src={toyDetail?.image} className='max-w-[100%] ' />
                            </div>
                        </Card>
                    </Col>
                    <Col span={11}>
                        <ToyInfo toy={toyDetail} />
                    </Col>
                </Row>
            )}

            {/* <Title level={1} className='mb-5 mt-20 text-center'>
                Relevant toy
            </Title> */}
        </>
    );
}
