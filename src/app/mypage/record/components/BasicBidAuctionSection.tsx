'use client';

import { useState } from 'react';

import * as Collapsible from '@radix-ui/react-collapsible';

import useGetBidAuctionHistories from '@/apis/queryHooks/User/useGetBidAuctionHistories';
import useGetBidAuctionHistoriesUnit from '@/apis/queryHooks/User/useGetBidAuctionHistoriesUnit';

import * as S from './BasicBid.css';
import BasicBidAuction from './BasicBidAuction';
import BasicBidAuctionBidList from './BasicBidAuctionBidList';
import { useRouter } from 'next/navigation';

export default function BasicBidAuctionSection() {
  const router = useRouter();

  const [bidUnitId, setBidUnitId] = useState<number | null>(null);

  const { data: bidAuctionListHistories } = useGetBidAuctionHistories();
  const { data: bidAuctionHistories } = useGetBidAuctionHistoriesUnit(bidUnitId);

  if (!bidAuctionListHistories) {
    return null;
  }

  const clickBidUnit = (clickBidUnitId: number) => {
    setBidUnitId(clickBidUnitId);
  };

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
              <button
                type="button"
                className={S.collapsibleTrigger}
                onClick={() => clickBidUnit(bidAuctionListHistory.auction_id)}
              >
                <BasicBidAuction bidAuctionHistory={bidAuctionListHistory} />
              </button>
            </Collapsible.Trigger>
            <Collapsible.Content>
              <BasicBidAuctionBidList bidAuctionHistories={bidAuctionHistories} />
            </Collapsible.Content>
          </Collapsible.Root>
        ))
      )}
    </ul>
  );
}
