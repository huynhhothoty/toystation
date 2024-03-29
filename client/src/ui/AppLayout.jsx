import { Outlet } from 'react-router-dom';
import { Affix, FloatButton, Layout, Tooltip } from 'antd';
import {
    PhoneOutlined,
    QuestionCircleOutlined,
    SettingFilled,
    SyncOutlined,
} from '@ant-design/icons';
import HeaderContent from './HeaderContent';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import FooterContent from './FooterContent';
import { useDarkMode } from '../context/DarkModeContext';

export default function AppLayout() {
    const { toggleMode } = useDarkMode();
    return (
        <Layout className='flex h-screen flex-col'>
            <Affix offsetTop={0}>
                <Header className='flex h-max flex-col py-[2px]'>
                    <HeaderContent />
                </Header>
            </Affix>

            <Content className='overflow-y-scroll'>
                <main className='container w-10/12 py-9'>
                    <Outlet />
                </main>
                <Footer className=''>
                    <FooterContent />
                </Footer>
            </Content>

            <FloatButton type='primary' icon={<PhoneOutlined />} className='left-14 h-14 w-14' />
            <FloatButton.Group
                trigger='click'
                type='primary'
                icon={<SettingFilled />}
                className='right-14'
            >
                <Tooltip title='How to use' placement='left'>
                    <FloatButton icon={<QuestionCircleOutlined />} />
                </Tooltip>
                <Tooltip title='Dark Mode' placement='left'>
                    <FloatButton icon={<SyncOutlined />} onClick={toggleMode} />
                </Tooltip>
            </FloatButton.Group>
        </Layout>
    );
}
