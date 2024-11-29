'use client';

import { useRouter } from 'next/navigation';

import useGetAuctionHistories from '@/apis/queryHooks/User/useGetAuctionHistories';

import { getAuctionStatusStyle } from '../getstatusStyle';

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
        ))
      )}
    </ul>
  );
}

export default BasicBidSoldSection;
