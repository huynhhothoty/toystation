import { Flex, Spin } from 'antd';
import { useUser } from '../../features/account/useUser';
import OptionButton from '../../features/admin/account/OptionButton';
import UpdateAuthen from '../../features/admin/account/UpdateAuthen';
import UpdateInfoForm from '../../features/admin/account/UpdateInfoForm';

export default function AccountManage() {
    const { user, isLoading } = useUser();

    if (isLoading) return <Spin fullscreen size='large' />;
    return (
        <Flex vertical={true} gap='large'>
            <UpdateInfoForm user={user} />
            <UpdateAuthen user={user} />

            <OptionButton />
        </Flex>
    );
}
