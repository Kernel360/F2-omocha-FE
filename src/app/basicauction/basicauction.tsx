import { Suspense } from 'react';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { AuctionData, GetBasicAuctionListParams } from '@/apis/types/basicAuction';
import { ListResponse } from '@/apis/types/common';
import BasicAuctionClientPage from '@/components/BasicAuctionClientPage';
import AuctionListSkeletonUI from '@/components/SkeletonUI/AuctionListSkeletonUI';
import usePrefetchQueryWithCookie from '@/hooks/usePrefetchQueryWithCookie';
import convertQueryParamsObjectToString from '@/utils/convertQueryParamsObjectToString';
import filteredParams from '@/utils/filteredParams';

async function BasicAuction({ searchParams }: { searchParams: GetBasicAuctionListParams }) {
  const params = {
    ...searchParams,
    categoryId: Number(searchParams.categoryId) || undefined, // 0일 때 undefined로 변환
    page: 0,
    size: 20,
  };

  const newParams = filteredParams<GetBasicAuctionListParams>(params);

  const queryClient = await usePrefetchQueryWithCookie<
    ListResponse<AuctionData[]>,
    ['basicAuctionList', typeof newParams]
  >({
    queryKey: ['basicAuctionList', newParams],
    api: `/v2/auctions?${convertQueryParamsObjectToString<GetBasicAuctionListParams>(newParams)}`,
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
