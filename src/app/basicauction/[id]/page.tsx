import { Breadcrumb } from '@/components/Breadcrumb';

interface BasicAuctionDetailPageProps {
  params: {
    id: number;
  };
}

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
    </div>
  );
}

export default BasicAuctionDetailPage;
