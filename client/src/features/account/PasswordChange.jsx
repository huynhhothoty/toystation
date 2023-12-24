import { Button, Form, Input, Spin } from 'antd';
import { useUser } from './useUser';

export function PasswordChange() {
    const { isLoading } = useUser();

    const onFinish = () => {};

    if (isLoading) return <Spin fullscreen size='large' />;
    return (
        <Form
            layout='vertical'
            name='basic'
            className='max-w-screen-sm'
            onFinish={onFinish}
            autoComplete='off'
        >
            <Form.Item
                label='Old Password'
                name='old'
                rules={[
                    {
                        required: true,
                        message: 'Please fill your old password',
                    },
                ]}
            >
                <Input.Password size='large' />
            </Form.Item>
            <Form.Item
                label='New Password'
                name='new'
                rules={[
                    {
                        required: true,
                        message: 'Please fill your new password',
                    },
                ]}
            >
                <Input.Password size='large' />
            </Form.Item>
            <Form.Item
                name='confirm'
                label='Confirm New Password'
                dependencies={['new']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('new') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(
                                new Error('The new password that you entered do not match!')
                            );
                        },
                    }),
                ]}
            >
                <Input.Password size='large' />
            </Form.Item>

            <Form.Item>
                <Button type='primary' htmlType='submit'>
                    Change Password
                </Button>
            </Form.Item>
        </Form>
    );
}
