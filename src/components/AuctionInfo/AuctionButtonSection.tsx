import * as S from './AuctionInfo.css';
import { usePermissionBidPrice } from './hooks/usePermissionBidPrice';

interface AuctionButtonSectionProps {
  id: number;
  sellerId: number;
  bidCount: number;
  instantBuyPrice: number | null;
  openBidConfirmModal: () => void;
  openInstantBuyConfirmModal: () => void;
  openDeleteConfirmModal: () => void;
}

function AuctionButtonSection({
  id,
  sellerId,
  bidCount,
  instantBuyPrice,
  openBidConfirmModal,
  openDeleteConfirmModal,
  openInstantBuyConfirmModal,
}: AuctionButtonSectionProps) {
  const { isPrevBuyer, expired, user, canNotBidForBid, canNotBidForInstantBuy, canDelete } =
    usePermissionBidPrice(id, sellerId);

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
        disabled={isPrevBuyer() || expired !== '' || !user}
        type="button"
        className={
          isPrevBuyer() || expired !== '' || !user ? S.bidButton.disabled : S.bidButton.default
        }
        onClick={openBidConfirmModal}
      >
        입찰하기
        <p className={S.bidButtonExplain}>{canNotBidForBid()}</p>
      </button>
      {instantBuyPrice && (
        <button
          disabled={expired !== '' || !user}
          type="button"
          className={expired !== '' || !user ? S.bidButton.disabled : S.bidButton.default}
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
