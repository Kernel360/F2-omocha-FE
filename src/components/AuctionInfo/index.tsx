import { useEffect, useRef, useState } from 'react';

import { ChevronDownIcon, ChevronUpIcon, RotateCwIcon } from 'lucide-react';

import useDeleteBasicAuction from '@/apis/queryHooks/basicAuction/useDeleteBasicAuction';
import useGetBasicAuction from '@/apis/queryHooks/basicAuction/useGetBasicAuction';
import useGetBasicAuctionNowPrice from '@/apis/queryHooks/basicAuction/useGetBasicAuctionNowPrice';
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

import * as S from './AuctionInfo.css';
import AuctionInstantBuyConfirmModal from './AuctionInstantBuyConfirmModal';

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
  const { data: currentPrice, refetch } = useGetBasicAuctionNowPrice(id);
  const { refetch: refetchBasicAuction } = useGetBasicAuction(id);

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

  const { expired, setExpired, user, canNotBid, canDelete } = usePermissionBidPrice(sellerId);
  const isSeller = sellerId === user?.member_id;

  useEffect(() => {
    if (auctionStatus === 'COMPLETED') {
      setExpired('completed');
    }
    if (auctionStatus === 'CONCLUDED') {
      setExpired('concluded');
    }
  }, [auctionStatus]);

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

  const iconRef = useRef<HTMLButtonElement>(null);

  const [isRotating, setIsRotating] = useState(false);

  const refreshCurrentPrice = () => {
    setIsRotating(true);
    refetch();
    refetchBasicAuction();
    // 로직이 끝난 후 애니메이션을 멈추기 위해 일정 시간이 지난 후 false로 설정
    setTimeout(() => {
      setIsRotating(false);
    }, 1000); // 1초 동안 회전
  };

  return (
    <div className={S.infoWrapper}>
      <div className={S.infoTitle}>{title}</div>
      <div className={S.infoRow}>
        <span className={S.infoRowTitle}>시작가</span>
        <span>
          {startPrice.toLocaleString('ko-KR')}
          <span>원</span>
        </span>
      </div>
      <div className={`${S.infoRow} ${S.nowPrice}`}>
        <span className={S.infoRowTitle}>현재가</span>
        <span>
          {currentPrice && currentPrice.result_data.now_price !== 0
            ? currentPrice.result_data.now_price.toLocaleString('ko-KR')
            : '-'}
          <span>원</span>
        </span>
      </div>
      {instantBuyPrice && (
        <div className={`${S.infoRow} ${S.nowPrice}`}>
          <span className={S.infoRowTitle}>즉시 구매가</span>
          <span>
            {instantBuyPrice.toLocaleString('ko-KR')}
            <span>원</span>
          </span>
        </div>
      )}

      <div className={`${S.infoRight} ${S.moveToRight}`}>
        <span
          className={`${S.calledTime} `}
        >{`${currentPrice ? currentPrice.result_data.called_at : '-'}불러옴`}</span>
        <button
          ref={iconRef}
          type="button"
          className={S.refreshCurrentPrice}
          onClick={refreshCurrentPrice}
        >
          <RotateCwIcon size={16} className={isRotating ? S.rotating : ''} />
        </button>
      </div>
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
      {canDelete ? (
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
            disabled={expired !== '' || !user}
            type="button"
            className={expired !== '' || !user ? S.bidButton.disabled : S.bidButton.default}
            onClick={openBidConfirmModal}
          >
            입찰하기
            <p className={S.bidButtonExplain}>{canNotBid()}</p>
          </button>
          {instantBuyPrice && (
            <button
              disabled={expired !== '' || !user}
              type="button"
              className={expired !== '' || !user ? S.bidButton.disabled : S.bidButton.default}
              onClick={openInstantBuyConfirmModal}
            >
              즉시 구매하기
              <p className={S.bidButtonExplain}>{canNotBid()}</p>
            </button>
          )}
        </div>
      )}
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
