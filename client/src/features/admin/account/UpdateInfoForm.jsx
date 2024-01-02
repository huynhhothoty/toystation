import { App, Button, Card, Flex, Form, Input, Spin } from 'antd';
import { useUpdateUserInfo } from '../../account/useUpdateUserInfo';

export default function UpdateInfoForm({ user }) {
    const [form] = Form.useForm();
    const { modal } = App.useApp();
    const { updateUserInfo, isUpdating } = useUpdateUserInfo();

    function onFinish(values) {
        modal.confirm({
            title: 'Confirm change?',
            onOk: () =>
                updateUserInfo(
                    { userId: user._id, updateInfo: values },
                    { onSuccess: () => form.setFieldsValue(values) }
                ),
        });
    }

    return (
        <Spin spinning={isUpdating}>
            <h1 className='mb-2'>Update Information</h1>
            <Card className='border-stone-200'>
                <Form
                    labelAlign='left'
                    labelCol={{
                        span: 3,
                        offset: 1,
                    }}
                    wrapperCol={{
                        span: 7,
                    }}
                    form={form}
                    name='info'
                    onFinish={onFinish}
                    initialValues={user}
                >
                    <Form.Item
                        label='Name'
                        name='name'
                        rules={[
                            {
                                required: true,
                                message: 'Please fill name!',
                            },
                        ]}
                    >
                        <Input size='large' />
                    </Form.Item>
                    <Form.Item
                        label='Phone'
                        name='phone'
                        rules={[
                            {
                                required: true,
                                message: 'Please fill phone!',
                            },
                        ]}
                    >
                        <Input size='large' />
                    </Form.Item>
                    <Form.Item
                        label='Address'
                        name='address'
                        rules={[
                            {
                                required: true,
                                message: 'Please fill address!',
                            },
                        ]}
                    >
                        <Input.TextArea size='large' />
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
