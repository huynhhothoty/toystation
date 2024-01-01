import { SyncOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from 'antd';

export default function RefreshButton() {
    const queryClient = useQueryClient();
    return (
        <Button
            onClick={() => queryClient.invalidateQueries()}
            size='large'
            icon={<SyncOutlined />}
        >
            Refresh
        </Button>
    );
}
