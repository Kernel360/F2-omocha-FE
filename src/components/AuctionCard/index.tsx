import { Clock, HeartIcon, UserCircle2Icon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// import HeartIcon from '@/assets/svg/heart.svg';

import colors from '@/styles/color';

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
  const { id, image, title, isLike, endTime, nowPrice } = SAMPLE;
  const isExpired = new Date() > new Date(endTime);
  const dDay = Math.floor(
    (new Date(endTime).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
  );
  return (
    <Link className={S.cardWrapper} href={`basicauction/${id}`} scroll={false}>
      {isExpired && <div className={S.dim}>종료된 경매입니다.</div>}
      <button type="button" className={S.heartStyle}>
        <HeartIcon size={16} stroke="red" fill={isLike ? 'red' : 'none'} />
      </button>
      {!isExpired && (
        <div className={S.floatTimer}>
          <Clock size={14} />
          <span>{`D-${dDay}`}</span>
        </div>
      )}
      <div className={S.cardContent}>
        <Image
          src={`https://s3.ap-northeast-2.amazonaws.com/omocha.storages/${image[0]}`}
          alt="Auction Image"
          width={216}
          height={200}
          className={S.cardImage}
        />
        <div className={S.userIcon}>
          <UserCircle2Icon size={24} stroke={colors.gray10} />
        </div>
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
