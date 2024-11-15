import { ClockIcon, HeartIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import calculateDDay from '@/utils/calculatedDDay';

import * as S from './AuctionCard.css';

interface AuctionCardProps {
  id: number;
  thumbnailImage: string;
  title: string;
  isLike: boolean;
  startPrice: number;
  startTime: string;
  endTime: string;
  nowPrice: number | null;
}

// 아래 부분은 변동이 많이 있을 것 같아 이전 코드를 주석으로 남깁니다.

function AuctionCard(SAMPLE: AuctionCardProps) {
  const { id, thumbnailImage, title, isLike, endTime, nowPrice } = SAMPLE;
  const isExpired = new Date() > new Date(endTime);
  const dDay = calculateDDay(endTime);

  return (
    <Link className={S.cardWrapper} href={`basicauction/${id}`} scroll={false}>
      {isExpired && <div className={S.dim}>종료된 경매입니다.</div>}
      <button type="button" className={S.heartStyle}>
        <HeartIcon size={16} stroke="red" fill={isLike ? 'red' : 'none'} />
      </button>
      {!isExpired && (
        <div className={S.floatTimer}>
          <ClockIcon size={14} />
          <span>{`D-${dDay}`}</span>
        </div>
      )}
      <div className={S.cardContent}>
        <Image
          src={`https://s3.ap-northeast-2.amazonaws.com/omocha.storages/${thumbnailImage}`}
          alt="Auction Image"
          width={196}
          height={196}
          className={S.cardImage}
        />
        {/* <div className={S.userIcon}>
          <UserCircle2Icon size={24} stroke={colors.gray10} />
        </div> */}
        <span className={S.cardTitle}>{title}</span>
        {/* <hr className={S.division} /> */}
        {/* <div className={S.cardTimeWrapper}> */}
        {/* <div className={S.cardFlex}>
            <span>시작가(KRW)</span>
            <span>{startPrice.toLocaleString('ko-KR')}원</span>
          </div> */}
        <div className={nowPrice ? S.cardFlexColor : S.cardFlexText}>
          <span>현재가(KRW)</span>
          {/* // 바꾸기 */}
          <span>{nowPrice ? nowPrice.toLocaleString('ko-KR') : '-'}원</span>
        </div>
        {/* </div> */}
        {/* <hr className={S.division} /> */}
        {/* <div className={S.cardTimeWrapper}>
          <div className={S.cardFlex}>
            <span>시작</span>
            <span>{startTime} (KST)</span>
          </div>
          <div className={S.cardFlex}>
            <span>종료</span>
            <span>{endTime} (KST)</span>
          </div>
        </div> */}
      </div>
    </Link>
  );
}

export default AuctionCard;
