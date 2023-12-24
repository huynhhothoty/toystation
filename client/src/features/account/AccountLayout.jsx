import { Card, Segmented } from 'antd';
import { useState } from 'react';
import { InfoChange } from './InfoChange';
import { PasswordChange } from './PasswordChange';
import { InfoCircleOutlined, KeyOutlined } from '@ant-design/icons';

export default function AccountLayout() {
    const [segment, setSegment] = useState('info');
    return (
        <>
            <Card className='mb-4'>
                <Segmented
                    size='large'
                    options={[
                        {
                            label: <span>Change Infomation</span>,
                            value: 'info',
                            icon: <InfoCircleOutlined />,
                        },
                        {
                            label: <span className='text-red-600'>Change Password</span>,
                            value: 'password',
                            icon: <KeyOutlined className='text-red-600' />,
                        },
                    ]}
                    value={segment}
                    onChange={setSegment}
                />
            </Card>

            <Card>{segment === 'info' ? <InfoChange /> : <PasswordChange />}</Card>
        </>
    );
}
