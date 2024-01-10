import { Card, Col, Flex, Row, Segmented, Spin, Statistic, Tooltip } from 'antd';
import RefreshButton from '../../ui/RefreshButton';
import { useReport } from '../../features/admin/dashboard/useReport';
import { loadingMsg } from '../../utils/messages';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    InfoCircleOutlined,
    MoneyCollectOutlined,
    SyncOutlined,
} from '@ant-design/icons';
import { formatCurrency } from '../../utils/helpers';
import SalesChart from '../../features/admin/dashboard/SalesChart';
import { useSearchParams } from 'react-router-dom';

export default function DashBoard() {
    const { report, isCalculating } = useReport();
    const [searchParams, setSearchParams] = useSearchParams();
    return (
        <Spin spinning={isCalculating} tip={loadingMsg} size='large'>
            <Card>
                <Flex justify='space-between' align='center'>
                    <h1>Overall statistic</h1>
                    <Flex justify='end' gap={20}>
                        <RefreshButton />
                        <Segmented
                            value={searchParams.get('numDay') ?? 'all'}
                            size='large'
                            defaultValue='all'
                            onChange={(value) => {
                                searchParams.set('numDay', value);
                                setSearchParams(searchParams);
                            }}
                            options={[
                                { label: 'All', value: 'all' },
                                { label: 'Last 7 days', value: '7' },
                                { label: 'Last 28 days', value: '28' },
                                { label: 'Last 364 days', value: '364' },
                            ]}
                        />
                    </Flex>
                </Flex>
            </Card>
            <Row gutter={16} className='my-5 text-center'>
                <Col span={3}>
                    <Tooltip title='All times statistic'>
                        <Card className='border-red-500'>
                            <Statistic title='Total Client' value={report?.numbersClient} />
                        </Card>
                    </Tooltip>
                </Col>
                <Col span={3}>
                    <Tooltip title='All times statistic'>
                        <Card className='border-red-500'>
                            <Statistic title='Total Product' value={report?.numbersToy} />
                        </Card>
                    </Tooltip>
                </Col>
                <Col span={12}>
                    <Card>
                        <Flex justify='space-evenly' align='center' gap={10}>
                            <Statistic title='Order' value={report?.totalNumOrder} />
                            <Statistic
                                valueStyle={{
                                    color: 'blue',
                                }}
                                prefix={<InfoCircleOutlined />}
                                title='Unconfirmed'
                                value={report?.totalOrderStatus?.unconfirmed}
                            />
                            <Statistic
                                valueStyle={{
                                    color: 'violet',
                                }}
                                prefix={<SyncOutlined />}
                                title='On going'
                                value={report?.totalOrderStatus?.['on-going']}
                            />
                            <Statistic
                                valueStyle={{
                                    color: 'green',
                                }}
                                prefix={<CheckCircleOutlined />}
                                title='Success'
                                value={report?.totalOrderStatus?.completed}
                            />
                            <Statistic
                                valueStyle={{
                                    color: '#cf1322',
                                }}
                                prefix={<CloseCircleOutlined />}
                                title='Failed'
                                value={report?.totalOrderStatus?.failed}
                            />
                        </Flex>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            valueStyle={{
                                color: 'black',
                            }}
                            prefix={<MoneyCollectOutlined />}
                            title='Total Revenue'
                            value={formatCurrency(report?.totalRevenue)}
                        />
                    </Card>
                </Col>
            </Row>

            <SalesChart data={report?.detail} />
        </Spin>
    );
}
