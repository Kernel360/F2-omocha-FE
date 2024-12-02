import { ChevronRightIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { BidAuctionHistoriesData } from '@/apis/types/User';

import { getAuctionStatusStyle, getBidStatusStyle } from '../getstatusStyle';

import * as S from './BasicBidAuction.css';
import useResizeViewportWidth from '@/hooks/useResizeViewportWidth';

interface BasicBidAuctionProps {
  bidAuctionHistory: BidAuctionHistoriesData;
}

function BasicBidAuction({ bidAuctionHistory }: BasicBidAuctionProps) {
  const router = useRouter();
  const { viewportWidth } = useResizeViewportWidth();

  return (
    <li className={S.list} key={bidAuctionHistory.auction_id}>
      <Image
        className={S.image}
        src={`https://s3.ap-northeast-2.amazonaws.com/omocha.storages/${bidAuctionHistory.thumbnail_path}`}
        width={120}
        height={120}
        alt="경매 사진"
      />
      <ul className={S.listRight}>
        <div className={S.listTitleWrapper}>
          <li className={`${S.listFirst} ${S.listData}`}>
            <button
              type="button"
              onClick={() =>
                router.push(`/basicauction/${bidAuctionHistory.auction_id}`, { scroll: false })
              }
              className={S.bidTitle}
            >
              <span>{bidAuctionHistory.title}</span>
              <ChevronRightIcon size={14} />
            </button>
          </li>
          {bidAuctionHistory.auction_status === 'BIDDING' && (
            <div className={S.bidding}>
              <span
                className={`${S.listValue} ${getAuctionStatusStyle(bidAuctionHistory.auction_status)}`}
              >
                {bidAuctionHistory.auction_status}진행중
              </span>
            </div>
          )}
          {(bidAuctionHistory.auction_status === 'CONCLUDED' ||
            bidAuctionHistory.auction_status === 'COMPLETE') &&
            !bidAuctionHistory.review_status && (
              <button
                type="button"
                className={S.reviewButton}
                onClick={e => {
                  e.stopPropagation();
                  if (viewportWidth && viewportWidth > 908) {
                    window.open(
                      `/review/${bidAuctionHistory.auction_id}?review_type=BUY_REVIEW`,
                      'review',
                      'width=400,height=600,top=100,left=100',
                    );
                  } else {
                    router.push(`/review/${bidAuctionHistory.auction_id}?review_type=BUY_REVIEW`);
                  }
                }}
              >
                <span className={S.listValue}>판매자 리뷰 쓰기</span>
              </button>
            )}
          {bidAuctionHistory.review_status && (
            <button type="button" className={S.reviewDone}>
              <span className={S.listValue}>판매자 리뷰 완료</span>
            </button>
          )}
        </div>
        <li className={S.listData}>
          <span className={S.listName}>입찰 상태</span>
          <span className={`${S.listValue} ${getBidStatusStyle(bidAuctionHistory.bid_status)}`}>
            {bidAuctionHistory.bid_status}
          </span>
        </li>
        <li className={S.listData}>
          <span className={S.listName}>입찰가</span>
          <span className={`${S.listValue} ${S.bidStatus.bidding}`}>
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
