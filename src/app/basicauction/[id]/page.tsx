import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { BasicAuctionResponseData } from '@/apis/types/basicAuction';
import MaxLayout from '@/components/MaxLayout';
import usePrefetchQueryWithCookie from '@/hooks/usePrefetchQueryWithCookie';

import BasicAuctionInfo from './BasicAuctionInfo';

interface BasicAuctionDetailPageProps {
  params: {
    id: number;
  };
}

async function BasicAuctionDetailPage({ params }: BasicAuctionDetailPageProps) {
  const queryClient = await usePrefetchQueryWithCookie<
    BasicAuctionResponseData,
    ['basicAuction', typeof params.id]
  >({
    queryKey: ['basicAuction', params.id],
    api: `/v2/auctions/${params.id}`,
  });

  return (
    <MaxLayout>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BasicAuctionInfo id={params.id} />
      </HydrationBoundary>
    </MaxLayout>
  );
}

export default BasicAuctionDetailPage;
