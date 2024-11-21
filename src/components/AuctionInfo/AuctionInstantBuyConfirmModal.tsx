interface AuctionInstantBuyConfirmModalProps {
  InstantBuyPrice: number;
}

export default function AuctionInstantBuyConfirmModal({
  InstantBuyPrice,
}: AuctionInstantBuyConfirmModalProps) {
  return (
    <div>{`${InstantBuyPrice.toLocaleString('ko-KR')} 원에 즉시 구매를 진행하시겠습니까?`}</div>
  );
}
