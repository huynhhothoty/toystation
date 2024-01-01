import { UploadOutlined } from '@ant-design/icons';
import { Button, Col, Flex, Form, Input, InputNumber, Row, Spin, Upload } from 'antd';

import { useCreateToy } from './useCreateToy';

export default function ProductDetailForm({ setOpenAdd }) {
    const [form] = Form.useForm();
    const { addToy, isAddingToy } = useCreateToy();

    const normFile = (e) => {
        const file = e.fileList && e.fileList.length > 0 ? e.fileList : null;
        return file;
    };

    function onFinish(values) {
        addToy(
            { data: { ...values, image: values.image.at(0).originFileObj } },
            {
                onSuccess: () => setOpenAdd(false),
            }
        );
    }

    return (
        <Spin size='large' spinning={isAddingToy}>
            <Form
                disabled={isAddingToy}
                className='mt-5'
                form={form}
                name='basic'
                labelAlign='left'
                labelCol={{
                    span: 5,
                }}
                wrapperCol={{
                    offset: 1,
                    span: 18,
                }}
                onFinish={onFinish}
                autoComplete='off'
            >
                <Form.Item
                    label='Product Name'
                    name='name'
                    rules={[
                        {
                            required: true,
                            message: 'Dont empty product name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label='Quantity'
                    name='quantity'
                    rules={[
                        {
                            required: true,
                            message: 'Dont empty product quantity!',
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    label='Price'
                    name='price'
                    rules={[
                        {
                            required: true,
                            message: 'Dont empty product price!',
                        },
                    ]}
                >
                    <InputNumber min={0} step={100} />
                </Form.Item>
                <Form.Item
                    label='Description'
                    name='description'
                    rules={[
                        {
                            required: true,
                            message: 'Dont empty product description!',
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    label='Age'
                    name='age'
                    rules={[
                        {
                            required: true,
                            message: 'Dont empty product age!',
                        },
                    ]}
                >
                    <InputNumber min={1} />
                </Form.Item>
                <Form.Item
                    label='Branch'
                    name='branch'
                    rules={[
                        {
                            required: true,
                            message: 'Dont empty product branch!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Origin'
                    name='origin'
                    rules={[
                        {
                            required: true,
                            message: 'Dont empty product origin!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Row justify='start' align='middle'>
                    <Col offset={6}>
                        <Form.Item
                            name='image'
                            valuePropName='fileList'
                            getValueFromEvent={normFile}
                            rules={[
                                {
                                    required: true,
                                    message: 'Dont empty product image!',
                                },
                            ]}
                        >
                            <Upload
                                accept='.png,.jpg,.jpeg'
                                beforeUpload={() => {
                                    return false;
                                }}
                                maxCount={1}
                                listType='picture'
                            >
                                <Button size='large' icon={<UploadOutlined />}>
                                    Upload new product image
                                </Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>

                <Flex className='my-4 items-center justify-end'>
                    <Form.Item>
                        <Button size='large' type='primary' htmlType='submit'>
                            Add Product
                        </Button>
                    </Form.Item>
                </Flex>
            </Form>
        </Spin>
    );
}
