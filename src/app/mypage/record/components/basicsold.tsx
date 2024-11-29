'use client';

import { ChevronRightIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { AuctionHistoriesData } from '@/apis/types/User';

import { getAuctionStatusStyle } from '../getstatusStyle';

import * as S from './BasicBidAuction.css';

interface BasicSoldProps {
  history: AuctionHistoriesData;
}

export default function BasicSold({ history }: BasicSoldProps) {
  const router = useRouter();

  return (
    <li className={S.list} key={history.auction_id}>
      <Image
        className={S.image}
        src={`${process.env.NEXT_PUBLIC_S3_URL}${history.thumbnail_path}`}
        width={150}
        height={150}
        alt="경매 사진"
      />
      <ul className={S.listRight}>
        <div className={S.listTitleWrapper}>
          <li className={`${S.listFirst} ${S.listData}`}>
            <button
              type="button"
              onClick={() => router.push(`/basicauction/${history.auction_id}`, { scroll: false })}
              className={S.bidTitle}
            >
              <span>{history.title}</span>
              <ChevronRightIcon size={14} />
            </button>
          </li>
          {history.auction_status === 'BIDDING' && (
            <div className={S.bidding}>
              <span className={`${S.listValue} ${getAuctionStatusStyle(history.auction_status)}`}>
                {history.auction_status}진행중
              </span>
            </div>
          )}
          {(history.auction_status === 'CONCLUDED' || history.auction_status === 'COMPLETE') &&
            !history.review_status && (
              <button
                type="button"
                className={S.reviewButton}
                onClick={e => {
                  e.stopPropagation();
                  console.log('리뷰 쓰기');
                }}
              >
                <span className={S.listValue}>구매자 리뷰 쓰기</span>
              </button>
            )}
        </div>
        <li className={S.listData}>
          <span className={S.listName}>판매 상태</span>
          <span className={`${S.listValue} ${getAuctionStatusStyle(history.auction_status)}`}>
            {history.auction_status}
          </span>
        </li>
        <li className={S.listData}>
          <span className={S.listName}>현재가</span>
          <span
            className={`${S.listValue} ${S.bidStatus.bidding}`}
          >{`${history.now_price ? history.now_price : '-'} 원 `}</span>
        </li>
        <li className={S.listData}>
          <span className={S.listName}>종료</span>
          <span className={S.listValue}>{history.end_date}</span>
        </li>
      </ul>
    </li>
  );
}
