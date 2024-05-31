import { Card } from 'antd';

export default function ForgetPassword() {
    return (
        <div className='flex h-screen items-center justify-center bg-slate-100'>
            <Card className='w-[400px]'>
                <h1 className='mb-7 tracking-wide'>Enter your email</h1>
                <ForgetPassword />
            </Card>
        </div>
    );
}
