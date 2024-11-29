'use client';

import { ChevronRightIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import useGetAuctionHistories from '@/apis/queryHooks/User/useGetAuctionHistories';

import * as S from './BasicBidAuction.css';
// import * as S from './BasicSold.css';

export default function BasicSold() {
  const { data: auctionHistories } = useGetAuctionHistories();
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

    return S.auctionStatus.default;
  };

  if (!auctionHistories) {
    return null;
  }

  return (
    <ul className={S.basicBid}>
      {auctionHistories.content.length === 0 ? (
        <div className={S.noListWrapper}>
          <div className={S.noListTitle}>아직 판매한 경매가 없습니다.</div>
          <button
            className={S.noListButton}
            type="button"
            onClick={() => router.push('/create', { scroll: false })}
          >
            경매 등록하러 가기
          </button>
        </div>
      ) : (
        auctionHistories.content.map(history => (
          <div key={history.auction_id}>
            <li className={S.list}>
              <Image
                className={S.image}
                src={`${process.env.NEXT_PUBLIC_S3_URL}${history.thumbnail_path}`}
                width={150}
                height={150}
                alt="경매 사진"
              />
              <ul className={S.listRight}>
                <li className={`${S.listFirst} ${S.listData}`}>
                  <button
                    type="button"
                    onClick={() =>
                      router.push(`/basicauction/${history.auction_id}`, { scroll: false })
                    }
                    className={S.bidTitle}
                  >
                    <span>{history.title}</span>
                    <ChevronRightIcon size={14} />
                  </button>
                  {history.auction_status === 'BIDDING' && (
                    <div className={S.bidding}>
                      <span
                        className={`${S.listValue} ${getAuctionStatusStyle(history.auction_status)}`}
                      >
                        {history.auction_status}진행중
                      </span>
                    </div>
                  )}
                </li>
                <li className={S.listData}>
                  <span className={S.listName}>판매 상태</span>
                  <span
                    className={`${S.listValue} ${getAuctionStatusStyle(history.auction_status)}`}
                  >
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
          </div>
        ))
      )}
    </ul>
  );
}
