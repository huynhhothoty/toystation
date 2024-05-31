import { Card } from 'antd';
import RegisterForm from '../features/authentication/RegisterForm';

export default function Register() {
    return (
        <div className='flex h-screen items-center justify-center bg-slate-100'>
            <Card className='w-[530px]'>
                <h1 className='mb-7 tracking-wide'>Register new account</h1>
                <RegisterForm />
            </Card>
        </div>
    );
}
