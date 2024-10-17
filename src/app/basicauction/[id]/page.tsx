import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { getBasicAuction } from '@/apis/queryFunctions/basicAuction';
import { Breadcrumb } from '@/components/Breadcrumb';

import BasicAuctionInfo from './BasicAuctionInfo';

interface BasicAuctionDetailPageProps {
  params: {
    id: number;
  };
}

async function BasicAuctionDetailPage({ params }: BasicAuctionDetailPageProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['basicAuction', params.id], // 이걸 하나로 묶는 작업을 진행해 보아도 좋을듯
    queryFn: () => getBasicAuction(params.id),
  });

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/basicauction">Products</Breadcrumb.Item>
        <Breadcrumb.Item>Product {params.id}</Breadcrumb.Item>
      </Breadcrumb>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BasicAuctionInfo id={params.id} />
      </HydrationBoundary>
    </div>
  );
}

export default BasicAuctionDetailPage;
