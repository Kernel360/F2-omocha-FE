import Image from 'next/image';

import { BidAuctionHistoriesData } from '@/apis/types/User';

import * as S from './BasicBidAuction.css';

const getBidStatusStyle = (bidStatus: string) => {
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

interface BasicBidAuctionProps {
  bidAuctionHistory: BidAuctionHistoriesData;
}

function BasicBidAuction({ bidAuctionHistory }: BasicBidAuctionProps) {
  return (
    <li className={S.list} key={bidAuctionHistory.auction_id}>
      {bidAuctionHistory.auction_status === 'BIDDING' && (
        <div className={S.bidding}>
          <span className={`${S.listValue} ${getBidStatusStyle(bidAuctionHistory.auction_status)}`}>
            {bidAuctionHistory.auction_status}진행중
          </span>
        </div>
      )}
      <Image
        className={S.image}
        src={`https://s3.ap-northeast-2.amazonaws.com/omocha.storages/${bidAuctionHistory.thumbnail_path}`}
        width={0}
        height={0}
        sizes="100vw"
        alt="경매 사진"
      />
      <ul className={S.listRight}>
        <li>
          <span className={S.listName}>상품명</span>
          <span className={S.listValue}>{bidAuctionHistory.title}</span>
        </li>
        <li>
          <span className={S.listName}>상태</span>
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
      </ul>
    </li>
  );
}

export default BasicBidAuction;
