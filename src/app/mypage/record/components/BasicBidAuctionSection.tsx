'use client';

import { useState } from 'react';

import * as Collapsible from '@radix-ui/react-collapsible';

import useGetBidAuctionHistories from '@/apis/queryHooks/User/useGetBidAuctionHistories';
import useGetBidAuctionHistoriesUnit from '@/apis/queryHooks/User/useGetBidAuctionHistoriesUnit';

import * as S from './BasicBid.css';
import BasicBidAuction from './BasicBidAuction';
import BasicBidAuctionBidList from './BasicBidAuctionBidList';

export default function BasicBidAuctionSection() {
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
      {bidAuctionListHistories.content.map(bidAuctionListHistory => (
        <Collapsible.Root className="CollapsibleRoot" key={bidAuctionListHistory.auction_id}>
          <Collapsible.Trigger asChild>
            <button type="button" onClick={() => clickBidUnit(bidAuctionListHistory.auction_id)}>
              <BasicBidAuction bidAuctionHistory={bidAuctionListHistory} />
            </button>
          </Collapsible.Trigger>
          <Collapsible.Content>
            <BasicBidAuctionBidList bidAuctionHistories={bidAuctionHistories} />
          </Collapsible.Content>
        </Collapsible.Root>
      ))}
    </ul>
  );
}
