import { useEffect, useState } from 'react';

import { ClockIcon, HeartIcon } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import usePostAuctionLike from '@/apis/queryHooks/basicAuction/usePostAuctionLike';
import CommonImage from '@/components/CommonImage';
import mixpanel from '@/lib/mixpanel';
import EVENT_ID from '@/static/eventId';
import { calculateDDay } from '@/utils/dateUtils';

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
  pageContext?: string;
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
    pageContext,
  } = SAMPLE;

  const isExpired = auctionStatus !== 'BIDDING'; // new Date() > new Date(endTime);
  const [isLike, setIsLike] = useState(false); // 서버와 클라이언트의 불일치 문제 해결을 위해 isLike를 상태로 관리
  const dDay = calculateDDay(endTime);
  const { mutate: postAuctionLike } = usePostAuctionLike(id, isLike);
  const searchParams = useSearchParams();
  const categoryId = Number(searchParams.get('categoryId'));

  useEffect(() => {
    setIsLike(initialLike);
  }, [initialLike]);

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    postAuctionLike();
  };

  const handleMixpanel = () => {
    mixpanel.track(EVENT_ID.AUCTION_DETAIL_ITEM_CLICKED, {
      page_context: pageContext, // 이전 페이지 경로
      category_id: categoryId, // 카테고리 아이디
      now_price: nowPrice, // 현재가
      is_expired: isExpired, // 경매 종료 여부
    });
  };

  return (
    <Link
      className={S.cardWrapper}
      href={`/basicauction/${id}?categoryId=${categoryId}`}
      onClick={handleMixpanel}
    >
      <div className={S.cardContent}>
        <CommonImage
          src={`${process.env.NEXT_PUBLIC_S3_URL}${thumbnailImage}`}
          alt="Auction Image"
          width={196}
          height={196}
          className={S.cardImage}
          priority
        />
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
