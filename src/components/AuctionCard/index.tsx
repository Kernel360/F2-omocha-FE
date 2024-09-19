import Image from 'next/image';
import HeartIcon from '@/assets/svg/heart.svg';
import * as S from './AuctionCard.css';

interface AuctionCardProps {
  isExpired: boolean;
  image: string;
  title: string;
  isLike: boolean;
  startPrice: number;
  startTime: string;
  endTime: string;
  nowPrice?: number;
}

function AuctionCard(SAMPLE: AuctionCardProps) {
  const { isExpired, image, title, isLike, startPrice, startTime, endTime, nowPrice } = SAMPLE;

  return (
    <div className={S.cardWrapper}>
      {isExpired && <div className={S.dim}>종료된 경매입니다.</div>}
      <HeartIcon className={S.heartStyle} stroke="red" fill={isLike ? 'red' : 'none'} />
      <Image
        src={image || 'https://via.placeholder.com/280x200'}
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
            <span>{startPrice ? startPrice.toLocaleString('ko-KR') : '3,000'}원</span>
            {/* 위 삼항연산자는 startPrice가 없을 경우 3,000원으로 표시하도록 함. 나중에 없어질 것임. */}
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
    </div>
  );
}

export default AuctionCard;
