import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';

export default function NumCounter({ numbers, setNumbers }) {
    const handlePlus = () => {
        if (numbers < 100) setNumbers(numbers + 1);
    };
    const handleMinus = () => {
        if (numbers > 1) setNumbers(numbers - 1);
    };
    const handleChange = (e) => {
        if (e.target.value < 100) setNumbers(e.target.value);
        else setNumbers(99);
    };
    return (
        <>
            <Button onClick={handleMinus} icon={<MinusOutlined />} />
            <Input className='w-[50px] text-center' value={numbers} onChange={handleChange} />
            <Button onClick={handlePlus} icon={<PlusOutlined />} />
        </>
    );
}
