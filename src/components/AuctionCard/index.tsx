import { useEffect, useState } from 'react';

import { ClockIcon, HeartIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import useGetBasicAuction from '@/apis/queryHooks/basicAuction/useGetBasicAuction';
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
  auctionStatus?: string;
  instantBuyPrice?: number | null;
}

function AuctionCard(SAMPLE: AuctionCardProps) {
  const {
    id,
    thumbnailImage,
    title,
    isLike: initialLike,
    endTime,
    nowPrice,
    auctionStatus,
    instantBuyPrice,
  } = SAMPLE;

  const searchParams = useSearchParams();
  const pickCategory = Number(searchParams.get('categoryId'));

  const isExpired = auctionStatus !== 'BIDDING'; // new Date() > new Date(endTime);
  const [isLike, setIsLike] = useState(false); // 서버와 클라이언트의 불일치 문제 해결을 위해 isLike를 상태로 관리
  const dDay = calculateDDay(endTime);
  const { mutate: postAuctionLike } = usePostAuctionLike(id, isLike);
  const { data: auctionData } = useGetBasicAuction(id);
  const categoryId = auctionData?.result_data.categories[0].category_id;

  useEffect(() => {
    setIsLike(initialLike);
  }, [initialLike]);

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    postAuctionLike({ auction_id: id });
  };

  return (
    <Link
      className={S.cardWrapper}
      href={`/basicauction/${id}?categoryId=${pickCategory === 0 ? categoryId : pickCategory}`}
    >
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
          priority
        />
        <span className={S.cardTitle}>{title}</span>
        <div className={nowPrice ? S.cardFlexColor : S.cardFlexText}>
          <span>현재가(KRW)</span>
          {nowPrice ? ` ${nowPrice.toLocaleString('ko-KR')} 원` : '입찰이 없습니다.'}
        </div>
        {instantBuyPrice && (
          <div className={instantBuyPrice ? S.cardFlexColor : S.cardFlexText}>
            <span>즉시 구매가(KRW)</span>
            <span>{instantBuyPrice.toLocaleString('ko-KR')}원</span>
          </div>
        )}
      </div>
    </Link>
  );
}

export default AuctionCard;
