import { useEffect } from 'react';

import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

import useDeleteBasicAuction from '@/apis/queryHooks/basicAuction/useDeleteBasicAuction';
import usePostBasicAuctionBid from '@/apis/queryHooks/basicAuction/usePostBasicAuctionBid';
import usePostBasicAuctionInstantBuy from '@/apis/queryHooks/basicAuction/usePostBasicAuctionInstantBuy';
import AuctionBidConfirmModal from '@/components/AuctionInfo/AuctionBidConfirmModal';
import AuctionBidListModal from '@/components/AuctionInfo/AuctionBidListModal';
import AuctionCountdown from '@/components/AuctionInfo/AuctionCountdown';
import AuctionDeleteConfirmModal from '@/components/AuctionInfo/AuctionDeleteConfirmModal';
import { useHandleBidPrice } from '@/components/AuctionInfo/hooks/useHandleBidPrice';
import { usePermissionBidPrice } from '@/components/AuctionInfo/hooks/usePermissionBidPrice';
import { Modal } from '@/components/Modal/Modal';
import ModalFooter from '@/components/Modal/ModalFooter';
import useBooleanState from '@/hooks/useBooleanState';
import useDebounce from '@/hooks/useDebounce';

import AuctionButtonSection from './AuctionButtonSection';
import * as S from './AuctionInfo.css';
import AuctionInstantBuyConfirmModal from './AuctionInstantBuyConfirmModal';
import AuctionPriceSection from './AuctionPriceSection';

interface AuctionInfoProps {
  id: number;
  title: string;
  auctionStatus: string;
  startPrice: number;
  nowPrice: number | null;
  endTime: string;
  bidCount: number;
  bidUnit: number;
  sellerId: number;
  instantBuyPrice: number | null;
}

function AuctionInfo(props: AuctionInfoProps) {
  const {
    id,
    title,
    auctionStatus,
    startPrice,
    nowPrice,
    bidCount,
    endTime,
    bidUnit,
    sellerId,
    instantBuyPrice,
  } = props;

  const { mutate: postBidMutate } = usePostBasicAuctionBid();
  const { mutate: postInstantBuyMutate } = usePostBasicAuctionInstantBuy(id);
  const { mutate: deleteAuctionMutate } = useDeleteBasicAuction();

  const {
    value: isOpenBidListModal,
    toggle: setIsOpenBidListModal,
    setTrue: openBidListModal,
  } = useBooleanState();

  const {
    value: isOpenBidConfirmModal,
    toggle: setIsOpenBidConfirmModal,
    setTrue: openBidConfirmModal,
  } = useBooleanState();

  const {
    value: isOpenInstantBuyConfirmModal,
    toggle: setIsOpenInstantBuyConfirmModal,
    setTrue: openInstantBuyConfirmModal,
  } = useBooleanState();

  const {
    value: isOpenDeleteConfirmModal,
    toggle: setIsOpenDeleteConfirmModal,
    setTrue: openDeleteConfirmModal,
  } = useBooleanState();

  const { bidInputRef, handleBidPriceDown } = useHandleBidPrice({
    nowPrice,
    startPrice,
    bidUnit,
  });

  const { setExpired, user, isPrevBuyer, canNotBidForBid, canNotBidForInstantBuy, canDelete } =
    usePermissionBidPrice(id, sellerId);
  const isSeller = sellerId === user?.member_id;

  useEffect(() => {
    if (auctionStatus === 'COMPLETED') {
      setExpired('completed');
    }
    if (auctionStatus === 'CONCLUDED') {
      setExpired('concluded');
    }
  }, [auctionStatus, setExpired]);

  const handleBidButton = useDebounce(() => {
    if (bidInputRef.current) {
      const bidAmount = bidInputRef.current.value;
      postBidMutate({
        id,
        params: {
          bid_price: Number(bidAmount),
        },
      });
    }
    setIsOpenBidConfirmModal();
  }, 300);

  const handleInstantBuyButton = useDebounce(() => {
    postInstantBuyMutate();
    setIsOpenInstantBuyConfirmModal();
  }, 300);

  return (
    <div className={S.infoWrapper}>
      <div className={S.infoTitle}>{title}</div>
      <AuctionPriceSection id={id} startPrice={startPrice} instantBuyPrice={instantBuyPrice} />
      <hr className={S.division} />
      <div className={S.infoRow}>
        <span className={S.infoRowTitle}>남은 시간</span>
        <AuctionCountdown endTime={endTime} setExpired={setExpired} auctionStatus={auctionStatus} />
      </div>
      <div className={S.endTimeDescription}>{endTime}</div>
      <div className={S.infoRow}>
        <span className={S.infoRowTitle}>입찰 기록</span>
        <div className={S.infoRight}>
          <span>{bidCount}회</span>
          <button type="button" className={S.infoButton} onClick={openBidListModal}>
            기록 보기
          </button>
        </div>
        <Modal isOpen={isOpenBidListModal} onOpenChange={setIsOpenBidListModal}>
          <AuctionBidListModal id={id} />
        </Modal>
      </div>
      <div className={S.infoRow}>
        <span className={S.infoRowTitle}>입찰 단위</span>
        <div className={S.infoRight}>
          <span>{`${bidUnit.toLocaleString()} 원`}</span>
        </div>
      </div>
      <div className={`${S.infoRow} ${isSeller ? S.noDisplay : ''}`}>
        <span className={S.infoRowTitle}>입찰 희망가</span>
        <div className={S.infoRight}>
          <input type="number" ref={bidInputRef} disabled />
          <span>원</span>
          <div>
            <button
              className={S.bidPriceButton}
              type="button"
              disabled={auctionStatus !== 'BIDDING'}
              onClick={() => {
                if (bidInputRef.current) {
                  const newBidInput = Number(bidInputRef.current.value) + bidUnit;
                  bidInputRef.current.value = newBidInput.toString();
                }
              }}
            >
              <ChevronUpIcon />
            </button>
            <button
              className={S.bidPriceButton}
              type="button"
              disabled={auctionStatus !== 'BIDDING'}
              onClick={handleBidPriceDown}
            >
              <ChevronDownIcon />
            </button>
          </div>
        </div>
      </div>
      <AuctionButtonSection
        bidCount={bidCount}
        instantBuyPrice={instantBuyPrice}
        openBidConfirmModal={openBidConfirmModal}
        openDeleteConfirmModal={openDeleteConfirmModal}
        openInstantBuyConfirmModal={openInstantBuyConfirmModal}
        auctionStatus={auctionStatus}
        isPrevBuyer={isPrevBuyer}
        canNotBidForBid={canNotBidForBid}
        canNotBidForInstantBuy={canNotBidForInstantBuy}
        canDelete={canDelete}
      />
      <ModalFooter
        isOpen={isOpenBidConfirmModal}
        onOpenChange={setIsOpenBidConfirmModal}
        positiveButton="확인"
        positiveButtonEvent={handleBidButton}
      >
        <AuctionBidConfirmModal bidPrice={bidInputRef?.current?.value} />
      </ModalFooter>
      {instantBuyPrice && (
        <ModalFooter
          isOpen={isOpenInstantBuyConfirmModal}
          onOpenChange={setIsOpenInstantBuyConfirmModal}
          positiveButton="확인"
          positiveButtonEvent={handleInstantBuyButton}
        >
          <AuctionInstantBuyConfirmModal InstantBuyPrice={instantBuyPrice} />
        </ModalFooter>
      )}
      <ModalFooter
        isOpen={isOpenDeleteConfirmModal}
        onOpenChange={setIsOpenDeleteConfirmModal}
        positiveButton="삭제"
        positiveButtonEvent={() => deleteAuctionMutate(id)}
      >
        <AuctionDeleteConfirmModal />
      </ModalFooter>
    </div>
  );
}

export default AuctionInfo;
