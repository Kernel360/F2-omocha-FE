'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import useGetAuctionHistories from '@/apis/queryHooks/User/useGetAuctionHistories';

import * as S from './BasicSold.css';

export default function BasicSold() {
  const { data: auctionHistories } = useGetAuctionHistories();
  const router = useRouter();

  const getBidStatusStyle = (bidStatus: string) => {
    if (bidStatus === 'CONCLUDED') {
      return S.bidStatus.concluded;
    }

    if (bidStatus === 'BIDDING') {
      return S.bidStatus.bidding;
    }

    if (bidStatus === 'NO_BIDS') {
      return S.bidStatus.defeat;
    }

    if (bidStatus === 'COMPLETE') {
      return S.bidStatus.complete;
    }

    return S.bidStatus.default;
  };

  if (!auctionHistories) {
    return null;
  }

  return (
    <ul className={S.basicSold}>
      {auctionHistories.content.length === 0 ? (
        <div className={S.noListWrapper}>
          <div className={S.noListTitle}>아직 판매한 물품이 없습니다.</div>
          <button
            className={S.noListButton}
            type="button"
            onClick={() => router.push('/create', { scroll: false })}
          >
            상품 등록하러 가기
          </button>
        </div>
      ) : (
        auctionHistories.content.map(history => (
          <Link
            key={history.auction_id}
            href={`/basicauction/${history.auction_id}`}
            scroll={false}
          >
            <li className={S.list}>
              {history.auction_status === 'BIDDING' && (
                <div className={S.bidding}>
                  <span className={`${S.listValue} ${getBidStatusStyle(history.auction_status)}`}>
                    {history.auction_status}진행중
                  </span>
                </div>
              )}
              <Image
                className={S.image}
                src={`${process.env.NEXT_PUBLIC_S3_URL}${history.thumbnail_path}`}
                width={0}
                height={0}
                sizes="100vw"
                alt="경매 사진"
              />
              <ul className={S.listRight}>
                <li>
                  <span className={S.listName}>상품명</span>
                  <span className={S.listValue}>{history.title}</span>
                </li>
                <li>
                  <span className={S.listName}>경매 상태</span>
                  <span className={`${S.listValue} ${getBidStatusStyle(history.auction_status)}`}>
                    {history.auction_status}
                  </span>
                </li>
                <li>
                  <span className={S.listName}>현재가</span>
                  <span
                    className={S.listValue}
                  >{`${history.now_price ? history.now_price : '-'} 원 `}</span>
                </li>
                <li>
                  <span className={S.listName}>종료</span>
                  <span className={S.listValue}>{history.end_date}</span>
                </li>
              </ul>
            </li>
          </Link>
        ))
      )}
    </ul>
  );
}
