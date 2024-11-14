import useGetBidAuctionHistories from '@/apis/queryHooks/User/useGetBidAuctionHistories';

import * as S from './BasicBid.css';
import BasicBidAuction from './BasicBidAuction';

export default function BasicBidAuctionSection() {
  const { data: bidAuctionHistories } = useGetBidAuctionHistories();

  if (!bidAuctionHistories) {
    return null;
  }

  return (
    <ul className={S.basicBid}>
      {bidAuctionHistories.content.map(bidAuctionHistory => (
        <BasicBidAuction key={bidAuctionHistory.auction_id} bidAuctionHistory={bidAuctionHistory} />
        // BasicBidAuction를 트리거로 쓰고content에 해당auction의 실질적인 bid list를 담는 방식으로 구현
      ))}
    </ul>
  );
}
