import { Empty, Flex, Spin, Typography } from 'antd';
import { useUser } from '../account/useUser';
const { Text } = Typography;

function CartOverviewItem({ item }) {
    return (
        <Flex gap={8} className='px-3 py-2' justify='space-between'>
            <strong>{item.numbers}</strong>
            <span>x</span>
            <Text type='success' italic strong>
                {item.item.name}
            </Text>
        </Flex>
    );
}

export default function CartOverview() {
    const { user, isLoading } = useUser();
    if (isLoading) return <Spin />;
    if (user?.cart?.length === 0) return <Empty description='Nothing in cart 😀' />;
    return (
        <div>
            {user?.cart?.map((item) => (
                <CartOverviewItem key={item.item._id} item={item} />
            ))}
            <div className='mt-3 flex justify-end'>
                <Text strong italic>
                    Total: {user.cart.length}
                </Text>
            </div>
        </div>
    );
}
