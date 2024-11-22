interface AuctionBidConfirmModalProps {
  bidPrice: string | undefined;
}

export default function AuctionBidConfirmModal({ bidPrice }: AuctionBidConfirmModalProps) {
  return <div>{`${Number(bidPrice).toLocaleString('ko-KR')} 원에 입찰을 진행하시겠습니까?`}</div>;
}
