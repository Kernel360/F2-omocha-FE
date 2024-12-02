import { useRef, useState } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import Link from 'next/link';

import goggleformImage from '@/assets/png/goggleform.png';
import sampleResizeBannerImage from '@/assets/png/sampleResizeBannerImage.png';
import sampleResizeBannerImage2 from '@/assets/png/sampleResizeBannerImage2.png';

import * as S from './MainCarousel.css';

const CAROUSEL_INFO = [
  {
    img: sampleResizeBannerImage,
    link: '/basicauction?page=1',
  },
  {
    img: goggleformImage,
    link: 'https://docs.google.com/forms/d/e/1FAIpQLSelN-LzbcOW3gI4bjTYXeX4jjr0Vmilyawehy3pV5UpJuWiTw/viewform',
  },
  {
    img: sampleResizeBannerImage2,
    link: 'basicauction?page=1',
  },
];

function MainCarousel() {
  const isDragging = useRef(false);
  const [isClicking, setIsClicking] = useState(false);
  const startMousePosition = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = false;
    startMousePosition.current = { x: e.clientX, y: e.clientY };
    setIsClicking(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isClicking) {
      const diffX = Math.abs(e.clientX - startMousePosition.current.x);
      const diffY = Math.abs(e.clientY - startMousePosition.current.y);

      if (diffX > 0 || diffY > 0) {
        isDragging.current = true;
        setIsClicking(false);
      }
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isDragging.current) {
      e.preventDefault();
    }
  };

  return (
    <div className={S.container}>
      <Slider
        dots
        infinite
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
        autoplay
        autoplaySpeed={8000}
        arrows={false}
      >
        {CAROUSEL_INFO.map(info => (
          <Link
            href={info.link}
            key={info.link}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onClick={handleClick}
          >
            <Image width={960} height={360} src={info.img} alt="test" className={S.carouselImage} />
          </Link>
        ))}
      </Slider>
    </div>
  );
}

export default MainCarousel;
