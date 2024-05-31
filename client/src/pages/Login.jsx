import { Link } from 'react-router-dom';
import LoginForm from '../features/authentication/LoginForm';
import { Card, Image } from 'antd';

export default function Login() {
    return (
        <div className='flex h-screen items-center justify-center bg-slate-100'>
            <Card className='w-[430px] px-4'>
                <div className='mb-7 mr-3 flex justify-center'>
                    <Link to='/'>
                        <Image height={160} width={180} preview={false} src='/logo2.png' />
                    </Link>
                </div>
                <LoginForm />
            </Card>
        </div>
    );
}
