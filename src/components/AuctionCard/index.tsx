import { ClockIcon, HeartIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import usePostAuctionLike from '@/apis/queryHooks/basicAuction/usePostAuctionLike';
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

function AuctionCard(SAMPLE: AuctionCardProps) {
  const { id, thumbnailImage, title, isLike, endTime, nowPrice } = SAMPLE;
  const isExpired = new Date() > new Date(endTime);
  const dDay = calculateDDay(endTime);
  const { mutate: postAuctionLike } = usePostAuctionLike(id, isLike);

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    postAuctionLike({ auction_id: id });
  };

  return (
    <Link className={S.cardWrapper} href={`basicauction/${id}`} scroll={false}>
      {isExpired && <div className={S.dim}>종료된 경매입니다.</div>}
      <button type="button" className={S.heartStyle} onClick={handleLike}>
        <HeartIcon size={16} stroke="red" fill={isLike ? '#FF0000' : 'none'} />
      </button>
      {!isExpired && (
        <div className={S.floatTimer}>
          <ClockIcon size={14} />
          <span>{`D-${dDay}`}</span>
        </div>
      )}
      <div className={S.cardContent}>
        <Image
          src={`${process.env.NEXT_PUBLIC_S3_URL}${thumbnailImage}`}
          alt="Auction Image"
          width={196}
          height={196}
          className={S.cardImage}
        />
        <span className={S.cardTitle}>{title}</span>
        <div className={nowPrice ? S.cardFlexColor : S.cardFlexText}>
          <span>현재가(KRW)</span>
          {/* // 바꾸기 */}
          <span>{nowPrice ? nowPrice.toLocaleString('ko-KR') : '-'}원</span>
        </div>
      </div>
    </Link>
  );
}

export default AuctionCard;
