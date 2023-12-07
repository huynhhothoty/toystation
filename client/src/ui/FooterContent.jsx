import { FacebookOutlined } from '@ant-design/icons';
import { Button, Col, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';
const { Title, Text } = Typography;

export default function FooterContent() {
    return (
        <footer className='py-1 text-center'>
            <Row justify='center' align='middle'>
                <Col span={7}>
                    <Title>About me</Title>
                    <Text>Huỳnh Hồ Thọ Tỷ</Text>
                </Col>
                <Col span={7}>
                    <Title>Policies</Title>
                    <Text>sample</Text>
                    <Text>sample</Text>
                    <Text>sample</Text>
                </Col>
                <Col span={7}>
                    <Title>Contact me</Title>
                    <Link target='_blank' to='https://www.facebook.com/ty.tho.5070'>
                        <Button icon={<FacebookOutlined />} />
                    </Link>
                </Col>
            </Row>
        </footer>
    );
}
