import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { formatCurrency } from '../../../utils/helpers';

export default function SalesChart({ data }) {
    const chartData = data?.map((ele, index) => {
        return {
            label: `Section ${index}`,
            revenue: ele.revenue,
        };
    });

    return (
        <ResponsiveContainer width='100%' aspect={3.2}>
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
                        <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
                        <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey='label' />
                <YAxis
                // tickFormatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                />
                <CartesianGrid strokeDasharray='3 3' />
                <Tooltip />
                <Area
                    type='monotone'
                    dataKey='revenue'
                    stroke='#8884d8'
                    fillOpacity={1}
                    fill='url(#colorUv)'
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}
