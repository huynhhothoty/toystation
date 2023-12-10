import { Card, Cascader, Col, Row } from 'antd';

const BrandOptions = [
    {
        label: 'Huzzle',
        value: 'huzzle',
    },
    {
        label: 'Giiker',
        value: 'giiker',
    },
    {
        label: 'Giiker2',
        value: 'giiker2',
    },
    {
        label: 'Giiker3',
        value: 'giiker3',
    },
];
const PriceOptions = [
    {
        label: 'Less than 100K',
        value: '100000',
    },
    {
        label: 'Less than 200k',
        value: '200000',
    },
];

export default function FilterProduct() {
    const onChange = (value) => {
        console.log(value);
    };
    return (
        <Card>
            <Row justify='space-evenly' align='middle'>
                <Col span={4}>
                    <Cascader
                        placement='bottomLeft'
                        placeholder='Select branch'
                        size='middle'
                        className='w-[100%]'
                        options={BrandOptions}
                        onChange={onChange}
                        multiple
                        maxTagCount={2}
                    />
                </Col>
                <Col span={4}>
                    <Cascader
                        placement='bottomLeft'
                        placeholder='Select price'
                        size='middle'
                        className='w-[100%]'
                        options={PriceOptions}
                        onChange={onChange}
                        multiple
                        maxTagCount={3}
                    />
                </Col>
                <Col span={4}>
                    <Cascader
                        placement='bottomLeft'
                        placeholder='Select material'
                        size='middle'
                        className='w-[100%]'
                        options={BrandOptions}
                        onChange={onChange}
                        multiple
                        maxTagCount={3}
                    />
                </Col>
                <Col span={4}>
                    <Cascader
                        placement='bottomLeft'
                        placeholder='Select age'
                        size='middle'
                        className='w-[100%]'
                        options={BrandOptions}
                        onChange={onChange}
                        multiple
                        maxTagCount={3}
                    />
                </Col>
                <Col span={4}>
                    <Cascader
                        placement='bottomLeft'
                        placeholder='Select category'
                        size='middle'
                        className='w-[100%]'
                        options={BrandOptions}
                        onChange={onChange}
                        multiple
                        maxTagCount={3}
                    />
                </Col>
            </Row>
        </Card>
    );
}
