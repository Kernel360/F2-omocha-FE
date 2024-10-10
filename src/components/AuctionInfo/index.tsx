'use client';

import { useRef, useState } from 'react';

import usePostBasicAuctionBid from '@/apis/queryHooks/basicAuction/usePostBasicAuctionBid';
import useBooleanState from '@/hooks/useBooleanState';
import { useAuth } from '@/provider/authProvider';

import { Modal } from '../Modal/Modal';

import AuctionBidListModal from './AuctionBidListModal';
import AuctionCountdown from './AuctionCountdown';
import * as S from './AuctionInfo.css';

interface AuctionInfoProps {
  id: number;
  title: string;
  startPrice: number;
  nowPrice: number;
  endTime: string;
  bidCount: number;
}

function AuctionInfo(SAMPLE: AuctionInfoProps) {
  const { token } = useAuth();
  const { id, title, startPrice, nowPrice, bidCount, endTime } = SAMPLE;
  const { mutate } = usePostBasicAuctionBid();

  const [expired, setExpired] = useState(false);
  const bidInputRef = useRef<HTMLInputElement>(null);

  const {
    value: isOpenBidListModal,
    toggle: setIsOpenBidListModal,
    setTrue: openBidListModal,
  } = useBooleanState();

  const handleBidButton = () => {
    if (bidInputRef.current) {
      const bidAmount = bidInputRef.current.value;

      mutate({
        id,
        params: {
          bid_price: Number(bidAmount),
        },
      });
    }
  };

  const canNotBid = () => {
    if (expired) {
      return '경매 진행 기간이 아닙니다.';
    }
    if (!token) {
      return '로그인 후 사용 가능한 서비스입니다.';
    }

    return '';
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
          {nowPrice && nowPrice.toLocaleString('ko-KR')}
          <span>원</span>
        </span>
      </div>
      <hr className={S.division} />
      <div className={S.infoRow}>
        <span className={S.infoRowTitle}>남은 시간</span>
        <AuctionCountdown endTime={endTime} setExpired={setExpired} />
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
        <span className={S.infoRowTitle}>입찰 희망가</span>
        <div className={S.infoRight}>
          <input type="number" ref={bidInputRef} />
          <span>원</span>
        </div>
      </div>
      <button
        disabled={expired || !token}
        type="button"
        className={expired || !token ? S.bidButton.disabled : S.bidButton.default}
        onClick={handleBidButton}
      >
        입찰하기
        <p className={S.bidButtonExplain}>{canNotBid()}</p>
      </button>
    </div>
  );
}

export default AuctionInfo;
