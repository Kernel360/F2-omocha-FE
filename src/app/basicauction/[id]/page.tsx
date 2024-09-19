interface BasicAuctionDetailPageProps {
  params: {
    id: number;
  };
}

function BasicAuctionDetailPage({ params }: BasicAuctionDetailPageProps) {
  return (
    <div>
      BasicAuctionDetailPage {params.id}
      <div>디테일 페이지에 들어왔다.</div>
    </div>
  );
}

export default BasicAuctionDetailPage;
