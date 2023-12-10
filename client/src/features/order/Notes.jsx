import { Card } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Title from 'antd/es/typography/Title';

export default function Notes() {
    return (
        <Card>
            <Title level={3}>Your note (can be empty)</Title>
            <TextArea autoSize={false} rows={4} />
        </Card>
    );
}
