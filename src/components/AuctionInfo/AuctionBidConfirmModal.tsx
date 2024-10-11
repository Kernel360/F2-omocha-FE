interface AuctionBidConfirmModalProps {
  bidPrice: string | undefined;
}

export default function AuctionBidConfirmModal({ bidPrice }: AuctionBidConfirmModalProps) {
  return <div>{`${bidPrice} 원`}에 입찰을 진행하시겠습니까?</div>;
}
