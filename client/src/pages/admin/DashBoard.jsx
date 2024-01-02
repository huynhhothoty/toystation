import { Card, Col, Flex, Row, Segmented, Spin, Statistic } from 'antd';
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

export default function DashBoard() {
    const { report, isCalculating } = useReport();
    return (
        <Spin spinning={isCalculating} tip={loadingMsg} size='large'>
            <Card>
                <Flex justify='space-between' align='center'>
                    <h1>Overall statistic</h1>
                    <Flex justify='end' gap={20}>
                        <RefreshButton />
                        <Segmented
                            size='large'
                            defaultValue='all'
                            onChange={(value) => {
                                console.log(value);
                            }}
                            options={[
                                { label: 'All', value: 'all' },
                                { label: 'Last 7 days', value: '7' },
                                { label: 'Last 30 days', value: '30' },
                                { label: 'Last 365 days', value: '365' },
                            ]}
                        />
                    </Flex>
                </Flex>
            </Card>
            <Row gutter={16} className='my-5 text-center'>
                <Col span={3}>
                    <Card>
                        <Statistic title='Total Client' value={report?.numbersClient} />
                    </Card>
                </Col>
                <Col span={3}>
                    <Card>
                        <Statistic title='Total Product' value={report?.numbersToy} />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card>
                        <Flex justify='space-evenly' align='center' gap={10}>
                            <Statistic title='Order' value={report?.numbersOrder} />
                            <Statistic
                                valueStyle={{
                                    color: 'blue',
                                }}
                                prefix={<InfoCircleOutlined />}
                                title='Unconfirmed'
                                value={report?.orderStatusCount.unconfirmed}
                            />
                            <Statistic
                                valueStyle={{
                                    color: 'violet',
                                }}
                                prefix={<SyncOutlined />}
                                title='On going'
                                value={report?.orderStatusCount['on-going']}
                            />
                            <Statistic
                                valueStyle={{
                                    color: 'green',
                                }}
                                prefix={<CheckCircleOutlined />}
                                title='Success'
                                value={report?.orderStatusCount.completed}
                            />
                            <Statistic
                                valueStyle={{
                                    color: '#cf1322',
                                }}
                                prefix={<CloseCircleOutlined />}
                                title='Failed'
                                value={report?.orderStatusCount.failed}
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
                            value={formatCurrency(report?.revenue)}
                        />
                    </Card>
                </Col>
            </Row>

            <SalesChart />
        </Spin>
    );
}
