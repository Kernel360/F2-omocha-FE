import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { BasicAuctionResponseData } from '@/apis/types/basicAuction';
import { Breadcrumb } from '@/components/Breadcrumb';
import MaxLayout from '@/components/MaxLayout';
import usePrefetchQueryWithCookie from '@/hooks/usePrefetchQueryWithCoookie';

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
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/basicauction">Products</Breadcrumb.Item>
        <Breadcrumb.Item>Product {params.id}</Breadcrumb.Item>
      </Breadcrumb>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BasicAuctionInfo id={params.id} />
      </HydrationBoundary>
    </MaxLayout>
  );
}

export default BasicAuctionDetailPage;
