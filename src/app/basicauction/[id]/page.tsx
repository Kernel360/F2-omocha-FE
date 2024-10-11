import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { cookies } from 'next/headers';

import { getBasicAuction } from '@/apis/queryFunctions/basicAuction';
import { Breadcrumb } from '@/components/Breadcrumb';
import TabsLayout from '@/components/TabsLayout';
import { AuthProvider } from '@/provider/authProvider';

import BasicAuctionInfo from './BasicAuctionInfo';

interface BasicAuctionDetailPageProps {
  params: {
    id: number;
  };
}

const TABS = [
  {
    title: '상품 정보',
    value: 'productInfo',
  },
  {
    title: '상품 문의',
    value: 'productInquiry',
  },
];

const TABS_CONTENT = [
  <div key="productInfo">상품 정보</div>,
  <div key="productInquiry">상품 문의</div>,
];

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
          {/* <div>BasicAuctionDetailPage {params.id}</div> */}
          <BasicAuctionInfo id={params.id} />
        </AuthProvider>
      </HydrationBoundary>

      <TabsLayout
        defaultTriggerValue={TABS[0].value}
        triggerTitleList={TABS}
        childrenList={TABS_CONTENT}
      />
    </div>
  );
}

export default BasicAuctionDetailPage;
