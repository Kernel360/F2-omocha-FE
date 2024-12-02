'use client';

import { useRouter } from 'next/navigation';

import useGetAuctionHistories from '@/apis/queryHooks/User/useGetAuctionHistories';

import * as S from './BasicBidAuction.css';
import BasicSold from './basicsold';

function BasicBidSoldSection() {
  const { data: auctionHistories } = useGetAuctionHistories();

  const router = useRouter();

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
          <div key={history.auction_id} className={S.listWrapper}>
            <BasicSold history={history} />
          </div>
        ))
      )}
    </ul>
  );
}

export default BasicBidSoldSection;
