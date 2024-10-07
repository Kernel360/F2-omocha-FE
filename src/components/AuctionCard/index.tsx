import Image from 'next/image';
import Link from 'next/link';

import HeartIcon from '@/assets/svg/heart.svg';

import * as S from './AuctionCard.css';

interface AuctionCardProps {
  id: number;
  image: string[];
  title: string;
  isLike: boolean;
  startPrice: number;
  startTime: string;
  endTime: string;
  nowPrice?: number;
}

function AuctionCard(SAMPLE: AuctionCardProps) {
  const { id, image, title, isLike, startPrice, startTime, endTime, nowPrice } = SAMPLE;
  const isExpired = new Date() > new Date(endTime);
  return (
    <Link className={S.cardWrapper} href={`basicauction/${id}`}>
      {isExpired && <div className={S.dim}>종료된 경매입니다.</div>}
      <HeartIcon className={S.heartStyle} stroke="red" fill={isLike ? 'red' : 'none'} />
      <Image
        src={`https://s3.ap-northeast-2.amazonaws.com/omocha.storages/${image[0]}`}
        alt="Auction Image"
        width={280}
        height={200}
        className={S.cardImage}
      />
      <div className={S.cardContent}>
        <span className={S.cardTitle}>{title}</span>
        <hr className={S.division} />
        <div className={S.cardTimeWrapper}>
          <div className={S.cardFlex}>
            <span>시작가(KRW)</span>
            <span>{startPrice.toLocaleString('ko-KR')}원</span>
          </div>
          {nowPrice && (
            <div className={S.cardFlexColor}>
              <span>현재가(KRW)</span>
              <span>{nowPrice.toLocaleString('ko-KR')}원</span>
            </div>
          )}
        </div>
        <hr className={S.division} />
        <div className={S.cardTimeWrapper}>
          <div className={S.cardFlex}>
            <span>시작</span>
            <span>{startTime} (KST)</span>
          </div>
          <div className={S.cardFlex}>
            <span>종료</span>
            <span>{endTime} (KST)</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default AuctionCard;
