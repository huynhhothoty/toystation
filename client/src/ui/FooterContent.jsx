import { FacebookOutlined } from '@ant-design/icons';
import { Button, Card, Col, Flex, Modal, Row, Typography } from 'antd';
import { useState } from 'react';
const { Title, Text } = Typography;

export default function FooterContent() {
    const [openPolicies, setOpenPolicies] = useState(false);

    return (
        <footer className='py-1 text-center'>
            <Row justify='center' align='middle'>
                <Col lg={7} md={12} xs={24}>
                    <Title>About me</Title>
                    <Text>Huỳnh Hồ Thọ Tỷ</Text>
                </Col>
                <Col lg={7} md={12} xs={24}>
                    <Title>Policies</Title>
                    <Button onClick={() => setOpenPolicies(true)}>Read our policies</Button>
                </Col>
                <Col lg={7} md={12} xs={24}>
                    <Title>Contact me</Title>

                    <Button
                        target='_blank'
                        href='https://www.facebook.com/ty.tho.5070'
                        icon={<FacebookOutlined />}
                    >
                        Facebook
                    </Button>
                </Col>
            </Row>
            <Modal
                centered
                title='Policies'
                open={openPolicies}
                onCancel={() => setOpenPolicies(false)}
                footer={null}
            >
                <Card>
                    <h3>Return item</h3>
                    <p>Item can be return in 10 days from delivery day.</p>
                </Card>
                <Flex className='mt-7' justify='end'>
                    <Button onClick={() => setOpenPolicies(false)} type='primary'>
                        OK
                    </Button>
                </Flex>
            </Modal>
        </footer>
    );
}
