import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Flex, Form, Input, Typography } from 'antd';
const { Text } = Typography;

export default function LoginForm({ openReg, openForget }) {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    return (
        <Form
            name='normal_login'
            className='login-form'
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                required
                name='email'
                rules={[
                    {
                        required: true,
                        message: 'Please fill Email!',
                    },
                    {
                        type: 'email',
                        message: 'Please fill a valid email',
                    },
                ]}
            >
                <Input size='large' prefix={<UserOutlined />} placeholder='Email' />
            </Form.Item>
            <Form.Item
                name='password'
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input.Password
                    size='large'
                    prefix={<LockOutlined className='site-form-item-icon' />}
                    type='password'
                    placeholder='Password'
                />
            </Form.Item>

            <Form.Item>
                <Flex justify='space-between' align='center'>
                    <Form.Item name='remember' valuePropName='checked' noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Button onClick={openForget} type='link'>
                        Forget password?
                    </Button>
                </Flex>
            </Form.Item>

            <Form.Item className='mt-5'>
                <Flex vertical align='center' gap={10}>
                    <Button block size='large' type='primary' htmlType='submit'>
                        Log in
                    </Button>
                    <Text>OR</Text>
                    <Button onClick={openReg} type='link'>
                        Register now!
                    </Button>
                </Flex>
            </Form.Item>
        </Form>
    );
}
