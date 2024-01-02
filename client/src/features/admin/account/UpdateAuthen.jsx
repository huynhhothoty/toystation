import { App, Button, Card, Flex, Form, Input, Spin } from 'antd';
import { useChangePassword } from '../../account/useChangePassword';

export default function UpdateAuthen({ user }) {
    const [form] = Form.useForm();
    const { modal } = App.useApp();
    const { changePassword, isChangingPassword } = useChangePassword();

    function onFinish(values) {
        modal.confirm({
            title: 'Change Password?',
            onOk: () =>
                changePassword(
                    { oldPassword: values.oldPassword, newPassword: values.newPassword },
                    {
                        onSuccess: () =>
                            form.resetFields(['oldPassword', 'newPassword', 'cofirmPassword']),
                    }
                ),
        });
    }

    return (
        <Spin spinning={isChangingPassword}>
            <h1 className='mb-2'>Authentication</h1>
            <Card className='border-stone-200'>
                <Form
                    initialValues={user}
                    labelAlign='left'
                    labelCol={{
                        span: 3,
                        offset: 1,
                    }}
                    wrapperCol={{
                        span: 7,
                    }}
                    form={form}
                    name='authen'
                    onFinish={onFinish}
                >
                    <Form.Item
                        label='Email'
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
                        <Input disabled size='large' placeholder='Email' />
                    </Form.Item>
                    <Form.Item
                        label='Old Password'
                        name='oldPassword'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your old Password!',
                            },
                        ]}
                    >
                        <Input.Password size='large' type='password' placeholder='Old Password' />
                    </Form.Item>
                    <Form.Item
                        label='New Password'
                        name='newPassword'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your new Password!',
                            },
                        ]}
                    >
                        <Input.Password size='large' type='password' placeholder='New Password' />
                    </Form.Item>
                    <Form.Item
                        dependencies={['newPassword']}
                        label='Confirm Password'
                        name='confirmPassword'
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your Password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error('The new password that you entered do not match!')
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password size='large' type='password' placeholder='New Password' />
                    </Form.Item>

                    <Flex justify='end' align='center' gap={12}>
                        <Form.Item>
                            <Button size='large' htmlType='reset'>
                                Reset
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' size='large' htmlType='submit'>
                                Update
                            </Button>
                        </Form.Item>
                    </Flex>
                </Form>
            </Card>
        </Spin>
    );
}
