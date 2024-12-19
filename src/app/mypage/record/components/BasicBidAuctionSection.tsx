'use client';

import * as Collapsible from '@radix-ui/react-collapsible';
import { useRouter } from 'next/navigation';

import useGetBidAuctionHistories from '@/apis/queryHooks/User/useGetBidAuctionHistories';
import SkeletonCard from '@/components/Skeleton/components/SkeletonCard';

import * as S from './BasicBid.css';
import BasicBidAuction from './BasicBidAuction';
import BasicBidAuctionBidList from './BasicBidAuctionBidList';

export default function BasicBidAuctionSection() {
  const router = useRouter();

  const { data: bidAuctionListHistories, isLoading } = useGetBidAuctionHistories();

  if (!bidAuctionListHistories) {
    return null;
  }

  if (isLoading) {
    return (
      <ul className={S.skeletonBasicBid}>
        <SkeletonCard width={660} height={150} />
        <SkeletonCard width={660} height={150} />
        <SkeletonCard width={660} height={150} />
      </ul>
    );
  }

  return (
    <ul className={S.basicBid}>
      {bidAuctionListHistories.content.length === 0 ? (
        <div className={S.noListWrapper}>
          <div className={S.noListTitle}>아직 입찰한 경매가 없습니다.</div>
          <button
            className={S.noListButton}
            type="button"
            onClick={() => router.push('/basicauction?page=1')}
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
