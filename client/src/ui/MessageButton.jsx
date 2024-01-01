import { BellOutlined } from '@ant-design/icons';
import { Badge, Button, Popover } from 'antd';
import MessageItem from './MessageItem';

function MessageContent() {
    return Array.from({ length: 6 }, (v, i) => i).map((ele) => <MessageItem key={ele} />);
}

export default function MessageButton() {
    return (
        <Popover placement='bottomRight' title='Message' content={<MessageContent />}>
            <Badge count={1}>
                <Button size='large' shape='circle' icon={<BellOutlined />} />
            </Badge>
        </Popover>
    );
}
