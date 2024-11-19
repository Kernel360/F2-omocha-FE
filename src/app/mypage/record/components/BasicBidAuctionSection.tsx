'use client';

import * as Collapsible from '@radix-ui/react-collapsible';
import { useRouter } from 'next/navigation';

import useGetBidAuctionHistories from '@/apis/queryHooks/User/useGetBidAuctionHistories';

import * as S from './BasicBid.css';
import BasicBidAuction from './BasicBidAuction';
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
          <div className={S.noListTitle}>아직 입찰한 물품이 없습니다.</div>
          <button
            className={S.noListButton}
            type="button"
            onClick={() => router.push('/basicauction', { scroll: false })}
          >
            상품 구경하러 가기
          </button>
        </div>
      ) : (
        bidAuctionListHistories.content.map(bidAuctionListHistory => (
          <Collapsible.Root className="CollapsibleRoot" key={bidAuctionListHistory.auction_id}>
            <Collapsible.Trigger asChild>
              <button type="button" className={S.collapsibleTrigger}>
                <BasicBidAuction bidAuctionHistory={bidAuctionListHistory} />
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
