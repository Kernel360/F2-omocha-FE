import { Breadcrumb } from '@/components/Breadcrumb';
import TabsLayout from '@/components/TabsLayout';

import * as S from './BasicAuctionDetailPage.css';
import Test from './Test';

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
  // const queryClient = new QueryClient();

  // await queryClient.prefetchQuery({
  //   queryKey: ['posts'],
  //   queryFn: () => getBasicAuctionQueryFn(params.id),
  // });

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/basicauction">Products</Breadcrumb.Item>
        <Breadcrumb.Item>Product {params.id}</Breadcrumb.Item>
      </Breadcrumb>
      <div className={S.auctionInfoWrapper}>
        <div>BasicAuctionDetailPage {params.id}</div>
        {/* <HydrationBoundary state={dehydrate(queryClient)}> */}
        <Test id={params.id} />
        {/* </HydrationBoundary> */}
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

// tab에 넘겨주는 부분을 어떻게 주면 좋을까.. => 이 부분에도 api res의 내용이 필요한데
