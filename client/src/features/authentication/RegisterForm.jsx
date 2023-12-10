import { Button, Flex, Form, Input, Typography } from 'antd';
const { Text } = Typography;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const buttonFormItemLayout = {
    wrapperCol: {
        offset: 0,
    },
};
export default function RegisterForm({ openLogin }) {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    return (
        <Form
            {...formItemLayout}
            form={form}
            name='register'
            onFinish={onFinish}
            style={{
                maxWidth: 600,
            }}
            scrollToFirstError
        >
            <Form.Item
                name='email'
                label='E-mail'
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please fill E-mail!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name='password'
                label='Password'
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name='confirm'
                label='Confirm Password'
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(
                                new Error('The new password that you entered do not match!')
                            );
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name='phone'
                label='Phone Number'
                rules={[
                    {
                        required: true,
                        message: 'Please input your phone number!',
                    },
                ]}
            >
                <Input
                    style={{
                        width: '100%',
                    }}
                />
            </Form.Item>

            {/* <Form.Item label='Captcha' extra='We must make sure that your are a human.'>
                <Row gutter={8}>
                    <Col span={12}>
                        <Form.Item
                            name='captcha'
                            noStyle
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the captcha you got!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Button>Get captcha</Button>
                    </Col>
                </Row>
            </Form.Item> */}

            <Form.Item {...buttonFormItemLayout} className='mt-5 w-full'>
                <Flex vertical align='center' gap={10}>
                    <Button block size='large' type='primary' htmlType='submit'>
                        Register
                    </Button>
                    <Text>OR</Text>
                    <Button onClick={openLogin} type='link'>
                        You have an account? Login now!
                    </Button>
                </Flex>
            </Form.Item>
        </Form>
    );
}
