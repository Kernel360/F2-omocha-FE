import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import Link from 'next/link';

import sampleResizeBannerImage from '@/assets/png/sampleResizeBannerImage.png';
import sampleResizeBannerImage2 from '@/assets/png/sampleResizeBannerImage2.png';

import * as S from './MainCarousel.css';

const CAROUSEL_INFO = [
  {
    img: sampleResizeBannerImage,
    link: 'https://www.hanwhaeagles.co.kr/index.do',
  },
  {
    img: sampleResizeBannerImage2,
    link: 'https://tigers.co.kr/',
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
        arrows={false}
      >
        {CAROUSEL_INFO.map(info => (
          <Link href={info.link} key={info.link}>
            <Image width={960} height={400} src={info.img} alt="test" className={S.carouselImage} />
          </Link>
        ))}
      </Slider>
    </div>
  );
}

export default MainCarousel;
