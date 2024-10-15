import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { cookies } from 'next/headers';

import { getBasicAuction } from '@/apis/queryFunctions/basicAuction';
import { Breadcrumb } from '@/components/Breadcrumb';
import { AuthProvider } from '@/provider/authProvider';

import BasicAuctionInfo from './BasicAuctionInfo';

interface BasicAuctionDetailPageProps {
  params: {
    id: number;
  };
}

async function BasicAuctionDetailPage({ params }: BasicAuctionDetailPageProps) {
  const cookie = cookies();
  const refreshToken = cookie.get('refresh')?.value || null;

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
        <AuthProvider initialToken={refreshToken}>
          <BasicAuctionInfo id={params.id} />
        </AuthProvider>
      </HydrationBoundary>
    </div>
  );
}

export default BasicAuctionDetailPage;
