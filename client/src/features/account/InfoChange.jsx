import { Button, Form, Input, Spin } from 'antd';
import { useUser } from './useUser';
import { useUpdateUserInfo } from './useUpdateUserInfo';
import { loadingMsg } from '../../utils/messages';

export function InfoChange() {
    const { user, isLoading } = useUser();
    const { updateUserInfo, isUpdating } = useUpdateUserInfo();
    const [form] = Form.useForm();

    const onFinish = (values) => {
        updateUserInfo(
            { userId: user._id, updateInfo: values },
            { onSuccess: () => form.setFieldValue(values) }
        );
    };

    if (isLoading || isUpdating) return <Spin fullscreen />;

    return (
        <Spin spinning={isLoading || isUpdating} tip={loadingMsg}>
            <Form
                form={form}
                layout='vertical'
                name='basic'
                className='max-w-screen-sm'
                onFinish={onFinish}
                autoComplete='off'
            >
                <Form.Item
                    initialValue={user.name}
                    label='Name'
                    name='name'
                    rules={[
                        {
                            required: true,
                            message: 'Dont empty name!',
                        },
                    ]}
                >
                    <Input size='large' />
                </Form.Item>

                <Form.Item initialValue={user.address} label='Address' name='address'>
                    <Input size='large' />
                </Form.Item>

                <Form.Item
                    initialValue={user.phone}
                    label='Phone'
                    name='phone'
                    rules={[
                        {
                            pattern: /^[0-9]{7,11}$/,
                            message: 'Please fill a valid phone number!',
                        },
                    ]}
                >
                    <Input size='large' />
                </Form.Item>

                <Form.Item>
                    <Button type='primary' htmlType='submit'>
                        Change
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    );
}
