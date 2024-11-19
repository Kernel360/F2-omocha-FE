import { Dispatch, SetStateAction, useEffect } from 'react';

import useCountdownTimer from '@/hooks/useCountdownTimer';

import * as S from './AuctionCountdown.css';

interface AuctionCountdownProps {
  endTime: Date | string;
  setExpired: Dispatch<SetStateAction<string>>;
  auctionStatus: string;
}

function AuctionCountdown({ auctionStatus, endTime, setExpired }: AuctionCountdownProps) {
  const { isTimeout, day, hour, minute, second } = useCountdownTimer({ endTime });

  useEffect(() => {
    if (auctionStatus === 'BIDDING' || auctionStatus === 'NO_BIDS') setExpired('expired');
  }, [isTimeout, setExpired]);

  return <div className={S.countdownStyle}>{`${day}일 ${hour}시간 ${minute}분 ${second}초`}</div>;
}

export default AuctionCountdown;
