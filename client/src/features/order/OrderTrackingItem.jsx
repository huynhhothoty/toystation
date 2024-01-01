import { Collapse } from 'antd';
import { formatCurrency } from '../../utils/helpers';
import { format as formatDate } from 'date-fns';

function ItemChildren({ order }) {
    return order.listSnapshot?.map((ele) => (
        <div className='flex gap-2' key={ele.item._id}>
            <span className='text-red-500'>{ele.numbers}</span>
            <span>x</span>
            <span className='font-semibold'>{ele.item.name}:</span>
            <span className='text-green-500'>{formatCurrency(ele.item.price * ele.numbers)}</span>
        </div>
    ));
}

export default function OrderTrackingItem({ order }) {
    return (
        <>
            <h3 className='text-red-400'>Address: {order.address}</h3>
            <h3 className='text-blue-800'>
                Time: {formatDate(order.deliveryEstimate, 'hh:mm, dd/MM/yyyy')}
            </h3>
            <h3 className='mb-4 text-green-600'>Paid: {formatCurrency(order.totalPrice)}</h3>
            <Collapse
                items={[{ key: 1, label: 'Detail', children: <ItemChildren order={order} /> }]}
            />
        </>
    );
}
