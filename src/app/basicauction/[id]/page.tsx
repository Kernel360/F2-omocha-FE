import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { getBasicAuction } from '@/apis/queryFunctions/basicAuctionQueryFn';
import { Breadcrumb } from '@/components/Breadcrumb';
import TabsLayout from '@/components/TabsLayout';

import * as S from './BasicAuctionDetailPage.css';
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
      <div className={S.auctionInfoWrapper}>
        <div>BasicAuctionDetailPage {params.id}</div>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <BasicAuctionInfo id={params.id} />
        </HydrationBoundary>
      </div>
      <TabsLayout
        defaultTriggerValue={TABS[0].value}
        triggerTitleList={TABS}
        childrenList={TABS_CONTENT}
      />
    </div>
  );
}

export default BasicAuctionDetailPage;
