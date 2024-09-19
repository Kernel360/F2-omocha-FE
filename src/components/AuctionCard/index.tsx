import Image from 'next/image';
import HeartIcon from '@/assets/svg/heart.svg';
import * as S from './AuctionCard.css';

interface AuctionCardProps {
  isExpired: boolean;
  title: string;
  isLike: boolean;
  startPrice: number;
  startTime: string;
  endTime: string;
}

function AuctionCard(SAMPLE: AuctionCardProps) {
  const { isExpired, title, isLike, startPrice, startTime, endTime } = SAMPLE;
  // time 어떻게 들어오는지 확인하고 validation 주어야함.

  return (
    <div className={S.cardWrapper}>
      {isExpired && <div className={S.dim}>종료된 경매입니다.</div>}
      <HeartIcon className={S.heartStyle} stroke="red" fill={isLike ? 'red' : 'none'} />
      <Image
        src="https://via.placeholder.com/280x200"
        alt="Auction Image"
        width={280}
        height={200}
        className={S.cardImage}
      />
      <div className={S.cardContent}>
        <span className={S.cardTitle}>{title}</span>
        <hr className={S.division} />
        <div className={S.cardFlex}>
          <span>시작가(KRW)</span>
          <span>{startPrice.toLocaleString('ko-KR')}원</span>
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
