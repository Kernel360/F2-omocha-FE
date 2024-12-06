import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { AuctionData, GetBasicAuctionListParams } from '@/apis/types/basicAuction';
import { ListResponse } from '@/apis/types/common';
import BasicAuctionClientPage from '@/components/BasicAuctionClientPage';
import usePrefetchQueryWithCookie from '@/hooks/usePrefetchQueryWithCookie';
import convertQueryParamsObjectToString from '@/utils/convertQueryParamsObjectToString';
import filteredParams from '@/utils/filteredParams';

async function BasicAuction({ searchParams }: { searchParams: GetBasicAuctionListParams }) {
  const params = {
    ...searchParams,
    page: Math.max((searchParams.page ?? 1) - 1, 0),
    categoryId: Number(searchParams.categoryId) || undefined, // 0일 때 undefined로 변환
    size: 20, // 사이즈 2로 ALL 에서 검토
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
    // <HydrationBoundary state={dehydrate(queryClient)}>
    // 일단 지운 이유는 얘는 auth가 없으면 그냥 불러오고 있음ㄴ 짐 여소를 반환해서..

    <BasicAuctionClientPage />
    // </HydrationBoundary>
  );
}

export default BasicAuction;
