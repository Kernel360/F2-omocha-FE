import { Suspense } from 'react';

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { getBasicAuctionList } from '@/apis/queryFunctions/basicAuction';
import BasicAuctionClientPage from '@/components/BasicAuctionClientPage';
import AuctionListSkeletonUI from '@/components/SkeletonUI/AuctionListSkeletonUI';

async function BasicAuction() {
  const queryClient = new QueryClient();

  const params = {
    title: '',
    auctionStatus: '',
    sort: '',
    direction: '',
    page: 0,
    size: 20,
  };

  await queryClient.prefetchQuery({
    queryKey: ['basicAuctionList', params],
    queryFn: () => getBasicAuctionList(params),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AuctionListSkeletonUI count={6} />}>
        <BasicAuctionClientPage />
      </Suspense>
    </HydrationBoundary>
  );
}

export default BasicAuction;
