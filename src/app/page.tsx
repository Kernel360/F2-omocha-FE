import { AuctionData, GetBasicAuctionListParams } from '@/apis/types/basicAuction';
import { ListResponse } from '@/apis/types/common';
import AuctionList from '@/components/AuctionList';
import MainCarousel from '@/components/MainCarousel';
import MaxLayout from '@/components/MaxLayout';
import SpecialSection from '@/components/SpecialSection';
import usePrefetchQueryWithCookie from '@/hooks/usePrefetchQueryWithCookie';
import convertQueryParamsObjectToString from '@/utils/convertQueryParamsObjectToString';
import filteredParams from '@/utils/filteredParams';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function Home() {
  const params = {
    title: '',
    auctionStatus: 'BIDDING',
    sort: 'bidCount',
    direction: 'DESC',
    page: 0,
    size: 4,
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
    <div>
      <MainCarousel />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SpecialSection />
      </HydrationBoundary>
      <MaxLayout>
        <AuctionList
          sort="createdAt"
          direction="DESC"
          path="/basicauction?page=1&sort=createdAt&direction=DESC"
          pathname="신규 경매 상품"
        />
        <AuctionList
          sort="endDate"
          direction="ASC"
          path="/basicauction?page=1&sort=endDate&direction=ASC"
          pathname="마감 임박 상품"
        />
      </MaxLayout>
    </div>
  );
}
