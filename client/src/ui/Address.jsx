import { EditOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';
const { Title, Text } = Typography;

export default function Address() {
    return (
        <Card className='w-full'>
            <Title
                level={3}
                style={{
                    color: 'red',
                }}
            >
                <EnvironmentOutlined />
                Your address
            </Title>

            <Row gutter={2} justify='space-between' align='middle'>
                <Col span={3}>
                    <Title level={3}>Username</Title>
                    <Text type='warning'>0909090909</Text>
                </Col>
                <Col span={16}>
                    <Text>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet architecto
                        eum maxime sunt laborum dolorem officia quo aliquid eveniet repellendus?
                    </Text>
                </Col>
                <Col span={3}>
                    <Link to='/account'>
                        <Button icon={<EditOutlined />}>Change</Button>
                    </Link>
                </Col>
            </Row>
        </Card>
    );
}
