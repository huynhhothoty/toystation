import { Tag } from 'antd';

export default function RenderStatusTag({ status }) {
    switch (status) {
        case 'unconfirmed':
            return <Tag color='warning'>Unconfirmed</Tag>;
        case 'on-going':
            return <Tag color='processing'>On Going</Tag>;
        case 'completed':
            return <Tag color='success'>Success</Tag>;
        case 'failed':
            return <Tag color='error'>Failed</Tag>;
    }
}
