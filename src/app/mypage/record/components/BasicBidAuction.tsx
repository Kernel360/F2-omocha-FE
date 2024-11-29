import { ChevronRightIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { BidAuctionHistoriesData } from '@/apis/types/User';

import * as S from './BasicBidAuction.css';

interface BasicBidAuctionProps {
  bidAuctionHistory: BidAuctionHistoriesData;
}

function BasicBidAuction({ bidAuctionHistory }: BasicBidAuctionProps) {
  const router = useRouter();

  const getAuctionStatusStyle = (bidStatus: string) => {
    // 공통으로 필요한 것
    if (bidStatus === 'CONCLUDED') {
      return S.auctionStatus.concluded;
    }

    if (bidStatus === 'BIDDING') {
      return S.auctionStatus.bidding;
    }

    if (bidStatus === 'NO_BIDS') {
      return S.auctionStatus.defeat;
    }

    if (bidStatus === 'COMPLETE') {
      return S.auctionStatus.complete;
    }

    return S.bidStatus.default;
  };

  const getBidStatusStyle = (bidStatus: string) => {
    // 공통으로 필요한 것
    if (bidStatus === '낙찰') {
      return S.bidStatus.concluded;
    }

    if (bidStatus === '입찰중') {
      return S.bidStatus.bidding;
    }

    if (bidStatus === '패찰') {
      return S.bidStatus.defeat;
    }

    return S.bidStatus.default;
  };

  return (
    <li className={S.list} key={bidAuctionHistory.auction_id}>
      <Image
        className={S.image}
        src={`https://s3.ap-northeast-2.amazonaws.com/omocha.storages/${bidAuctionHistory.thumbnail_path}`}
        width={150}
        height={150}
        alt="경매 사진"
      />
      <ul className={S.listRight}>
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
                  console.log('리뷰 쓰기');
                }}
              >
                리뷰 쓰기
              </button>
            )}
        </li>
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
