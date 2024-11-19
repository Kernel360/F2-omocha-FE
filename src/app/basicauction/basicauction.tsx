import { Suspense } from 'react';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { AuctionData, GetBasicAuctionListParams } from '@/apis/types/basicAuction';
import { ListResponse } from '@/apis/types/common';
import BasicAuctionClientPage from '@/components/BasicAuctionClientPage';
import AuctionListSkeletonUI from '@/components/SkeletonUI/AuctionListSkeletonUI';
import usePrefetchQueryWithCookie from '@/hooks/usePrefetchQueryWithCoookie';
import convertQueryParamsObjectToString from '@/utils/convertQueryParamsObjectToString';

async function BasicAuction() {
  const params: GetBasicAuctionListParams = {
    categoryId: '',
    title: '',
    auctionStatus: '',
    sort: '',
    direction: '',
    page: 0,
    size: 20,
  };

  const queryClient = await usePrefetchQueryWithCookie<
    ListResponse<AuctionData[]>,
    ['basicAuctionList', typeof params]
  >({
    queryKey: ['basicAuctionList', params],
    api: `/v2/auctions?${convertQueryParamsObjectToString<GetBasicAuctionListParams>(params)}`,
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
