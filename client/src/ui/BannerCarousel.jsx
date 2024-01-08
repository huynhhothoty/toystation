import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Carousel, Image } from 'antd';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

export default function BannerCarousel() {
    const carouselRef = useRef();
    return (
        <div className='relative'>
            <Button
                style={{ height: 60, width: 60 }}
                className='absolute left-5 top-1/2 z-40 border-black'
                onClick={() => {
                    carouselRef.current.prev();
                }}
                shape='circle'
                size='large'
                icon={<LeftOutlined />}
            />
            <Button
                style={{ height: 60, width: 60 }}
                className='absolute right-5 top-1/2 z-40 border-black'
                onClick={() => {
                    carouselRef.current.next();
                }}
                shape='circle'
                size='large'
                icon={<RightOutlined />}
            />
            <Carousel ref={carouselRef} dots={false} autoplay autoplaySpeed={1500} className=''>
                <div>
                    <Link to='/toys'>
                        <Image
                            preview={false}
                            className='w-[100%]'
                            src='/carousel.png'
                            alt='carousel'
                        />
                    </Link>
                </div>
                <div>
                    <Link to='/toys'>
                        <Image
                            preview={false}
                            className='w-[100%]'
                            src='/carousel2.png'
                            alt='carousel'
                        />
                    </Link>
                </div>
                <div>
                    <Link to='/toys'>
                        <Image
                            preview={false}
                            className='w-[100%]'
                            src='/carousel3.png'
                            alt='carousel'
                        />
                    </Link>
                </div>
            </Carousel>
        </div>
    );
}
