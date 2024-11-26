import useGetUser from '@/apis/queryHooks/User/useGetUser';

import * as S from './AuctionInfo.css';

interface AuctionButtonSectionProps {
  bidCount: number;
  instantBuyPrice: number | null;
  openBidConfirmModal: () => void;
  openInstantBuyConfirmModal: () => void;
  openDeleteConfirmModal: () => void;
  auctionStatus: string;
  isPrevBuyer: () => boolean;
  canNotBidForBid: () => string;
  canNotBidForInstantBuy: () => string;
  canDelete: boolean;
}

function AuctionButtonSection({
  bidCount,
  instantBuyPrice,
  openBidConfirmModal,
  openDeleteConfirmModal,
  openInstantBuyConfirmModal,
  auctionStatus,
  isPrevBuyer,
  canNotBidForBid,
  canNotBidForInstantBuy,
  canDelete,
}: AuctionButtonSectionProps) {
  const isExpired = auctionStatus !== 'BIDDING';

  const { data: user } = useGetUser();

  return canDelete ? (
    <div className={S.bidButtonWrapper}>
      <button
        type="button"
        disabled={bidCount > 0}
        className={bidCount > 0 ? S.deleteButton.disabled : S.deleteButton.default}
        onClick={openDeleteConfirmModal}
      >
        삭제하기
        {bidCount > 0 && (
          <p className={S.bidButtonExplain}>현재 입찰이 걸려 게시글을 삭제할 수 없습니다.</p>
        )}
      </button>
    </div>
  ) : (
    <div className={S.bidButtonWrapper}>
      <button
        disabled={isPrevBuyer() || isExpired || !user}
        type="button"
        className={isPrevBuyer() || isExpired || !user ? S.bidButton.disabled : S.bidButton.default}
        onClick={openBidConfirmModal}
      >
        입찰하기
        <p className={S.bidButtonExplain}>{canNotBidForBid()}</p>
      </button>
      {instantBuyPrice && (
        <button
          disabled={isExpired || !user}
          type="button"
          className={isExpired || !user ? S.bidButton.disabled : S.bidButton.default}
          onClick={openInstantBuyConfirmModal}
        >
          즉시 구매하기
          <p className={S.bidButtonExplain}>{canNotBidForInstantBuy()}</p>
        </button>
      )}
    </div>
  );
}

export default AuctionButtonSection;
