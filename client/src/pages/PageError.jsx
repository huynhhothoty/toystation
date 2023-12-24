import { Button, Result } from 'antd';

export default function PageError() {
    return (
        <Result
            status={500}
            title={500}
            subTitle='Oops! Something went wrong 😥'
            extra={
                <Button size='large' href='/' type='primary'>
                    Return home
                </Button>
            }
        />
    );
}
