import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Flex, Form, Input, Spin, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useLogin } from './useLogin';
const { Text } = Typography;

export default function LoginForm() {
    const navigate = useNavigate();
    const { login, isLoging } = useLogin();
    const [form] = Form.useForm();
    const onFinish = (values) => {
        const { email, password, isRemember } = values;
        login(
            { email, password, isRemember },
            {
                onSuccess: () => {
                    // form.resetFields();
                },
            }
        );
    };

    return (
        <Spin spinning={isLoging}>
            <Form
                form={form}
                disabled={isLoging}
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
                        <Form.Item
                            initialValue={false}
                            name='isRemember'
                            valuePropName='checked'
                            noStyle
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Button onClick={() => navigate('/forget')} type='link'>
                            Forget password?
                        </Button>
                    </Flex>
                </Form.Item>

                <Form.Item className='mt-5'>
                    <Flex vertical align='center' gap={10}>
                        <Button block size='large' type='primary' htmlType='submit'>
                            Login
                        </Button>
                        <Text>OR</Text>
                        <Button onClick={() => navigate('/register')} type='link'>
                            Register now!
                        </Button>
                    </Flex>
                </Form.Item>
            </Form>
        </Spin>
    );
}
