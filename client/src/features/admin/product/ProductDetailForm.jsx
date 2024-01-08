import { UploadOutlined } from '@ant-design/icons';
import {
    AutoComplete,
    Button,
    Col,
    Flex,
    Form,
    Image,
    Input,
    InputNumber,
    Row,
    Spin,
    Upload,
} from 'antd';
import { useToyDetail } from '../../toy/useToyDetail';
import { useToys } from '../../toy/useToys';
import { useEditToy } from './useEditToy';

export default function ProductDetailForm({ toyId, setOpenForm }) {
    const { toyDetail, isLoading } = useToyDetail(toyId);
    const { editToy, isEditingToy } = useEditToy();
    const [form] = Form.useForm();
    const { toys } = useToys();

    const normFile = (e) => {
        const file = e.fileList && e.fileList.length > 0 ? e.fileList : null;
        return file;
    };

    const categoryList = toys?.reduce((acc, cur) => {
        if (cur.category && !acc.includes(cur.category)) return [...acc, cur.category];
        return acc;
    }, []);
    let selectCateList = categoryList.map((ele) => {
        return { value: ele, label: ele };
    });

    let updateValue = {};
    function onValueChange(changedValue) {
        updateValue = { ...updateValue, ...changedValue };
    }
    function onFinish() {
        if ('updateImage' in updateValue) {
            updateValue = { ...updateValue, image: updateValue.updateImage.at(0).originFileObj };
        }
        editToy({ toyId: toyId, data: updateValue }, { onSuccess: () => setOpenForm(false) });
    }

    if (isLoading)
        return (
            <div className='flex items-center justify-center'>
                <Spin size='large' />
            </div>
        );
    return (
        <Spin size='large' spinning={isEditingToy}>
            <Form
                onValuesChange={onValueChange}
                disabled={isEditingToy}
                className='mt-5'
                form={form}
                name='basic'
                initialValues={toyDetail}
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
                    label='Category'
                    name='category'
                    rules={[
                        {
                            required: true,
                            message: 'Please input product category',
                        },
                    ]}
                >
                    <AutoComplete className='w-[50%!important]' options={selectCateList} />
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
                    <InputNumber
                        className='w-[50%!important]'
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        min={0}
                        step={100}
                    />
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
                    <Col span={5}>
                        <Image src={toyDetail.image} />
                    </Col>
                    <Col offset={1}>
                        <Form.Item
                            name='updateImage'
                            valuePropName='fileList'
                            getValueFromEvent={normFile}
                        >
                            <Upload
                                beforeUpload={() => {
                                    return false;
                                }}
                                accept='.png,.jpg,.jpeg'
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
                            Update Information
                        </Button>
                    </Form.Item>
                </Flex>
            </Form>
        </Spin>
    );
}
