import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import Link from 'next/link';

import * as S from './MainCarousel.css';

const CAROUSEL_INFO = [
  {
    img: 'https://imgstatic.10x10.co.kr/main/202410/710/mainRolling_94631_20241031165946.jpg',
    link: 'https://www.hanwhaeagles.co.kr/index.do',
  },
  {
    img: 'https://imgstatic.10x10.co.kr/main/202410/710/mainRolling_94626_20241031171637.jpg',
    link: 'https://tigers.co.kr/',
  },
  {
    img: 'https://imgstatic.10x10.co.kr/main/202410/710/mainRolling_94625_20241031171328.jpg',
    link: 'https://www.hanwhaeagles.co.kr/index.do',
  },
  {
    img: 'https://imgstatic.10x10.co.kr/main/202410/710/mainRolling_94629_20241031171410.jpg',
    link: 'https://www.hanwhaeagles.co.kr/index.do',
  },
];

function MainCarousel() {
  return (
    <div className={S.container}>
      <Slider
        dots
        infinite
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
        autoplay // 자동 캐러셀
        autoplaySpeed={2000}
        // dotsClass={S.dots}
      >
        {CAROUSEL_INFO.map(info => (
          <Link href={info.link} key={info.link}>
            <Image width={960} height={500} src={info.img} alt="test" className={S.carouselImage} />
          </Link>
        ))}
      </Slider>
    </div>
  );
}

export default MainCarousel;
