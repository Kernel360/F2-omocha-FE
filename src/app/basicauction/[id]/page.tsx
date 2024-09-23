import { Breadcrumb } from '@/components/Breadcrumb';
import TabsLayout from '@/components/TabsLayout';

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

function BasicAuctionDetailPage({ params }: BasicAuctionDetailPageProps) {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/basicauction">Products</Breadcrumb.Item>
        <Breadcrumb.Item>Product {params.id}</Breadcrumb.Item>
      </Breadcrumb>
      BasicAuctionDetailPage {params.id}
      <div>디테일 페이지에 들어왔다.</div>
      <div>여기서 어떤 데이터를 불러오겠지 그걸 TABS CONTENT 컴포넌트에 넘겨줘</div>
      <TabsLayout
        defaultTriggerValue={TABS[0].value}
        triggerTitleList={TABS}
        childrenList={TABS_CONTENT}
      />
    </div>
  );
}

export default BasicAuctionDetailPage;
