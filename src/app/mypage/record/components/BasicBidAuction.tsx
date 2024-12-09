import { ChevronRightIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { BidAuctionHistoriesData } from '@/apis/types/User';
import mixpanel from '@/lib/mixpanel';
import EVENT_ID from '@/static/eventId';

import * as S from './BasicBidAuction.css';

interface BasicBidAuctionProps {
  bidAuctionHistory: BidAuctionHistoriesData;
}

function BasicBidAuction({ bidAuctionHistory }: BasicBidAuctionProps) {
  const router = useRouter();

  return (
    <li className={S.list} key={bidAuctionHistory.auction_id}>
      <Image
        className={S.image}
        src={`${process.env.NEXT_PUBLIC_S3_URL}${bidAuctionHistory.thumbnail_path}`}
        width={150}
        height={150}
        alt="경매 사진"
      />
      <ul className={S.listRight}>
        <li className={`${S.listFirst} ${S.listData}`}>
          <button
            type="button"
            onClick={e => {
              router.push(`/basicauction/${bidAuctionHistory.auction_id}`, { scroll: false }); // 카테고리 추가 필요
              e.stopPropagation();
              mixpanel.track(EVENT_ID.AUCTION_DETAIL_ITEM_CLICKED, {
                page_context: 'record_page',
                now_price: bidAuctionHistory.now_price,
                is_expired: bidAuctionHistory.auction_status !== 'BIDDING',
                // 카테고리 아이디 추가 필요
              });
            }}
            className={S.bidTitle}
          >
            <span>{bidAuctionHistory.title}</span>
            <ChevronRightIcon size={14} />
          </button>
          {bidAuctionHistory.auction_status === 'BIDDING' && (
            <div className={S.bidding}>
              <span className={`${S.listValue} ${S.bidStatus.bidding}`}>
                {bidAuctionHistory.auction_status}진행중
              </span>
            </div>
          )}
        </li>
        <li className={S.listData}>
          <span className={S.listName}>입찰 상태</span>
          <span
            className={
              bidAuctionHistory.bid_status === '낙찰'
                ? S.myBidStatus.concluded
                : S.myBidStatus.defeat
            }
          >
            {bidAuctionHistory.bid_status}
          </span>
        </li>
        <li className={S.listData}>
          <span className={S.listName}>현재가</span>
          <span className={S.bidStatus.bidding}>
            {bidAuctionHistory.now_price
              ? bidAuctionHistory.now_price.toLocaleString('ko-KR')
              : '-'}
            원
          </span>
        </li>
      </ul>
    </li>
  );
}

export default BasicBidAuction;
