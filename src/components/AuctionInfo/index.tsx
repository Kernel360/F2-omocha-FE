'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  const { token } = useAuth();
  const { id, title, startPrice, nowPrice, bidCount, endTime } = SAMPLE;
  const [expired, setExpired] = useState(false);

  const {
    value: isOpenBidListModal,
    toggle: setIsOpenBidListModal,
    setTrue: openBidListModal,
  } = useBooleanState();

  const handleBidButton = () => {
    if (token) {
      console.log('bid 가능');
    } else {
      router.push('/login');
    }
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
          <input type="number" />
          <span>원</span>
        </div>
      </div>
      <button
        disabled={expired}
        type="button"
        className={expired ? S.bidButton.disabled : S.bidButton.default}
        onClick={handleBidButton}
      >
        입찰하기
      </button>
    </div>
  );
}

export default AuctionInfo;
