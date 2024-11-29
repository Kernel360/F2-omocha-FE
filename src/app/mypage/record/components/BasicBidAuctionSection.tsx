'use client';

import * as Collapsible from '@radix-ui/react-collapsible';
import { useRouter } from 'next/navigation';

import useGetBidAuctionHistories from '@/apis/queryHooks/User/useGetBidAuctionHistories';

import { getAuctionStatusStyle } from '../getstatusStyle';

import BasicBidAuction from './BasicBidAuction';
import * as S from './BasicBidAuction.css';
import BasicBidAuctionBidList from './BasicBidAuctionBidList';

export default function BasicBidAuctionSection() {
  const router = useRouter();

  const { data: bidAuctionListHistories } = useGetBidAuctionHistories();

  if (!bidAuctionListHistories) {
    return null;
  }

  return (
    <ul className={S.basicBid}>
      {bidAuctionListHistories.content.length === 0 ? (
        <div className={S.noListWrapper}>
          <div className={S.noListTitle}>아직 입찰한 경매가 없습니다.</div>
          <button
            className={S.noListButton}
            type="button"
            onClick={() => router.push('/basicauction', { scroll: false })}
          >
            경매 구경하러 가기
          </button>
        </div>
      ) : (
        bidAuctionListHistories.content.map(bidAuctionListHistory => (
          <Collapsible.Root className="CollapsibleRoot" key={bidAuctionListHistory.auction_id}>
            <Collapsible.Trigger asChild>
              <button type="button" className={S.collapsibleTrigger}>
                <BasicBidAuction bidAuctionHistory={bidAuctionListHistory} />
                {bidAuctionListHistory.auction_status === 'BIDDING' && (
                  <div className={S.bidding}>
                    <span
                      className={`${S.listValue} ${getAuctionStatusStyle(bidAuctionListHistory.auction_status)}`}
                    >
                      {bidAuctionListHistory.auction_status}진행중
                    </span>
                  </div>
                )}
                {(bidAuctionListHistory.auction_status === 'CONCLUDED' ||
                  bidAuctionListHistory.auction_status === 'COMPLETE') &&
                  !bidAuctionListHistory.review_status && (
                    <button
                      type="button"
                      className={S.reviewButton}
                      onClick={e => {
                        e.stopPropagation();
                        console.log('리뷰 쓰기');
                      }}
                    >
                      <span className={S.listValue}>판매자 리뷰 쓰기</span>
                    </button>
                  )}
              </button>
            </Collapsible.Trigger>
            <Collapsible.Content>
              <BasicBidAuctionBidList bidAuctionHistoriesId={bidAuctionListHistory.auction_id} />
            </Collapsible.Content>
          </Collapsible.Root>
        ))
      )}
    </ul>
  );
}
