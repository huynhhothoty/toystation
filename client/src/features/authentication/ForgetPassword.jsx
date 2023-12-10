import { Button, Flex, Form, Input } from 'antd';
import { useState } from 'react';

const buttonFormItemLayout = {
    wrapperCol: {
        offset: 0,
    },
};
export default function ForgetPassword() {
    const [isSendCode, setIsSendCode] = useState(false);
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    return (
        <Form
            labelAlign='left'
            labelCol={{
                flex: '130px',
            }}
            labelWrap
            wrapperCol={{
                flex: 1,
            }}
            form={form}
            name='register'
            onFinish={onFinish}
            style={{
                maxWidth: 600,
                marginTop: '20px',
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
                <Input size='large' />
            </Form.Item>

            {isSendCode && (
                <>
                    <Form.Item
                        name='password'
                        label='New password'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password size='large' />
                    </Form.Item>

                    <Form.Item
                        name='confirm'
                        label='Confirm new password'
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
                        <Input.Password size='large' />
                    </Form.Item>
                </>
            )}

            <Form.Item {...buttonFormItemLayout} className='mt-5 w-full'>
                <Flex vertical align='center' gap={10}>
                    <Button
                        onClick={() => setIsSendCode(true)}
                        block
                        type='default'
                        htmlType='button'
                    >
                        Send code to my email {isSendCode ? 'again' : ''}
                    </Button>
                </Flex>
            </Form.Item>

            {isSendCode && (
                <Form.Item {...buttonFormItemLayout} className='mt-5 w-full'>
                    <Flex vertical align='center' gap={10}>
                        <Button danger block size='large' type='primary' htmlType='submit'>
                            Set new password
                        </Button>
                    </Flex>
                </Form.Item>
            )}
        </Form>
    );
}
