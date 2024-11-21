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
        <li className={S.listFirst}>
          <button
            type="button"
            onClick={() =>
              router.push(`/basicauction/${bidAuctionHistory.auction_id}`, { scroll: false })
            }
            className={S.bidTitle}
          >
            {bidAuctionHistory.title}
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
        <li>
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
        <li>
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
