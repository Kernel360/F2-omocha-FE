import { CalendarClock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import useGetBasicAuctionList from '@/apis/queryHooks/basicAuction/useGetBasicAuctionList';
import { AuctionData } from '@/apis/types/basicAuction';

import * as S from './SpecialSection.css';

function SpecialSection() {
  const { data } = useGetBasicAuctionList({
    title: '',
    auctionStatus: 'BIDDING',
    sort: 'bidCount',
    direction: 'DESC',
    page: 0,
    size: 4,
  });

  if (!data) return null;

  return (
    <div className={S.specialSection}>
      <div className={S.specialSectionTitle}>
        <div className={S.flex}>
          <span className={S.only}>현재</span>
          <CalendarClock size={24} />
        </div>
        <span className={S.popularItem}>인기 경매</span>
      </div>

      <div className={S.specialAuction}>
        {data.result_data.content.map((auction: AuctionData) => (
          <Link
            href={`/basicauction/${auction.auction_id}`}
            key={auction.auction_id}
            className={S.specialAuctionItem}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_S3_URL}${auction.thumbnail_path}`}
              className={S.specialAuctionImage}
              width={170}
              height={170}
              alt="image"
            />
            <div className={S.specialAuctionTitle}> {auction.title}</div>
            <div className={S.specialAuctionPrice}>
              <span className={S.specialAuctionPriceTitle}>현재가 </span>
              {auction.now_price
                ? ` ${auction.now_price.toLocaleString('ko-KR')} 원`
                : '입찰이 없습니다.'}
            </div>
            {auction.instant_buy_price && (
              <div className={S.specialAuctionPrice}>
                <span className={S.specialAuctionPriceTitle}>즉시 구매가 </span>
                {auction.instant_buy_price.toLocaleString()} 원
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SpecialSection;
