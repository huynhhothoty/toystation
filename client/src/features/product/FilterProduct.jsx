import { Button, Card, Col, Form, Row, Select } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetFilterInfo } from '../../hooks/useGetFilterInfo';

const PriceOptions = [
    {
        label: 'From 0 to 100K',
        value: '0-100000',
    },
    {
        label: 'From 101K to 300K',
        value: '100001-300000',
    },
    {
        label: 'From 301K to 1M',
        value: '300001-1000000',
    },
    {
        label: 'From 1M to 3M',
        value: '1000001-3000000',
    },
    {
        label: 'Above 3M',
        value: '300001-9999999999',
    },
];
const AgeOptions = [
    {
        label: 'All',
        value: 0,
    },
    {
        label: '3 +',
        value: 3,
    },
    {
        label: '5 +',
        value: 5,
    },
    {
        label: '8 +',
        value: 8,
    },
    {
        label: '13 +',
        value: 13,
    },
    {
        label: '18 +',
        value: 18,
    },
];
const OriginOptions = [
    {
        label: 'China',
        value: 'china',
    },
    {
        label: 'Japan',
        value: 'japan',
    },
    {
        label: 'Vietnamese',
        value: 'vietnamese',
    },
    {
        label: 'America',
        value: 'america',
    },
    {
        label: 'India',
        value: 'india',
    },
    {
        label: 'England',
        value: 'england',
    },
];

export default function FilterProduct() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { categoryList, brandList } = useGetFilterInfo();
    const navigate = useNavigate();

    const cateSelectList = categoryList?.map((ele) => {
        return { value: ele, label: ele };
    });
    const brandSelectList = brandList?.map((ele) => {
        return { value: ele, label: ele };
    });

    const onFinish = (values) => {
        for (const key in values)
            if (values[key]) {
                if (key === 'price') {
                    const [minPrice, maxPrice] = values[key].split('-');
                    searchParams.set('price[$gte]', minPrice);
                    searchParams.set('price[$lte]', maxPrice);
                } else if (key === 'age') {
                    searchParams.set('age[$gte]', values[key]);
                } else searchParams.set(key, values[key]);
            }

        setSearchParams(searchParams);
    };

    return (
        <Card
            bodyStyle={{
                padding: '10px',
            }}
        >
            <Form name='filter' onFinish={onFinish}>
                <Row gutter={16} align='middle'>
                    <Col span={4}>
                        <Form.Item label='Category' name='category' className='m-0'>
                            <Select allowClear className='w-full' options={cateSelectList} />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item label='Price' name='price' className='m-0'>
                            <Select allowClear className='w-full' options={PriceOptions} />
                        </Form.Item>
                    </Col>
                    <Col span={2}>
                        <Form.Item label='Age' name='age' className='m-0'>
                            <Select allowClear className='w-full' options={AgeOptions} />
                        </Form.Item>
                    </Col>
                    <Col span={3}>
                        <Form.Item label='Origin' name='origin' className='m-0'>
                            <Select allowClear className='w-full' options={OriginOptions} />
                        </Form.Item>
                    </Col>
                    <Col span={3}>
                        <Form.Item label='Brand' name='branch' className='m-0'>
                            <Select allowClear className='w-full' options={brandSelectList} />
                        </Form.Item>
                    </Col>

                    <Col span={1} offset={4}>
                        <Form.Item className='m-0'>
                            <Button
                                size='large'
                                htmlType='reset'
                                onClick={() => {
                                    navigate('');
                                }}
                            >
                                Reset
                            </Button>
                        </Form.Item>
                    </Col>
                    <Col span={2} offset={1}>
                        <Form.Item className='m-0'>
                            <Button size='large' type='primary' htmlType='submit'>
                                Filter
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
}
