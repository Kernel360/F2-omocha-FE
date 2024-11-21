import { Dispatch, SetStateAction, useEffect } from 'react';

import useCountdownTimer from '@/hooks/useCountdownTimer';

import * as S from './AuctionCountdown.css';

interface AuctionCountdownProps {
  endTime: Date | string;
  setExpired: Dispatch<SetStateAction<string>>;
  auctionStatus: string;
}

function AuctionCountdown({ auctionStatus, endTime, setExpired }: AuctionCountdownProps) {
  const { isTimeout, day, hour, minute, second } = useCountdownTimer({ endTime, auctionStatus });

  useEffect(() => {
    if (auctionStatus === 'CONCLUDED') {
      setExpired('concluded');
    }
    if (auctionStatus === 'COMPLETE') {
      setExpired('completed');
    }
    if ((auctionStatus === 'BIDDING' || auctionStatus === 'NO_BIDS') && isTimeout) {
      setExpired('expired');
    }
    if ((auctionStatus === 'BIDDING' || auctionStatus === 'NO_BIDS') && !isTimeout) {
      setExpired('');
    }
  }, [isTimeout, setExpired]);

  return <div className={S.countdownStyle}>{`${day}일 ${hour}시간 ${minute}분 ${second}초`}</div>;
}

export default AuctionCountdown;
