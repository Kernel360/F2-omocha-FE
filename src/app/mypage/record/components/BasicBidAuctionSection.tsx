import * as Collapsible from '@radix-ui/react-collapsible';

import useGetBidAuctionHistories from '@/apis/queryHooks/User/useGetBidAuctionHistories';

import * as S from './BasicBid.css';
import BasicBidAuction from './BasicBidAuction';
import BasicBidAuctionBidList from './BasicBidAuctionBidList';

export default function BasicBidAuctionSection() {
  const { data: bidAuctionHistories } = useGetBidAuctionHistories();

  if (!bidAuctionHistories) {
    return null;
  }

  return (
    <ul className={S.basicBid}>
      {bidAuctionHistories.content.map(bidAuctionHistory => (
        <Collapsible.Root className="CollapsibleRoot" key={bidAuctionHistory.auction_id}>
          <Collapsible.Trigger asChild>
            <BasicBidAuction bidAuctionHistory={bidAuctionHistory} />
          </Collapsible.Trigger>
          <Collapsible.Content>
            <BasicBidAuctionBidList />
          </Collapsible.Content>
        </Collapsible.Root>
      ))}
    </ul>
  );
}
