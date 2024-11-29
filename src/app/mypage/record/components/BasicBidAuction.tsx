import { ChevronRightIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { BidAuctionHistoriesData } from '@/apis/types/User';

import { getBidStatusStyle } from '../getstatusStyle';

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
