import { Button, Result } from 'antd';

export default function PageNotFound() {
    return (
        <Result
            status={404}
            title={404}
            subTitle='Sorry, the page you are looking for is not exist!'
            extra={
                <Button href='/' type='primary'>
                    Return home
                </Button>
            }
        />
    );
}
