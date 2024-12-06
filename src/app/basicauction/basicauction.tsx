// import { AuctionData, GetBasicAuctionListParams } from '@/apis/types/basicAuction';
// import { ListResponse } from '@/apis/types/common';
import BasicAuctionClientPage from '@/components/BasicAuctionClientPage';
// import usePrefetchQueryWithCookie from '@/hooks/usePrefetchQueryWithCookie';
// import convertQueryParamsObjectToString from '@/utils/convertQueryParamsObjectToString';
// import filteredParams from '@/utils/filteredParams';

// { searchParams }: { searchParams: GetBasicAuctionListParams }
async function BasicAuction() {
  // const params = {
  //   ...searchParams,
  //   page: Math.max((searchParams.page ?? 1) - 1, 0),
  //   categoryId: Number(searchParams.categoryId) || undefined, // 0일 때 undefined로 변환
  //   size: 20, // 사이즈 2로 ALL 에서 검토
  // };

  // const newParams = filteredParams<GetBasicAuctionListParams>(params);

  // const queryClient = await usePrefetchQueryWithCookie<
  //   ListResponse<AuctionData[]>,
  //   ['basicAuctionList', typeof newParams]
  // >({
  //   queryKey: ['basicAuctionList', newParams],
  //   api: `/v2/auctions?${convertQueryParamsObjectToString<GetBasicAuctionListParams>(newParams)}`,
  // });

  return <BasicAuctionClientPage />;
}

export default BasicAuction;
