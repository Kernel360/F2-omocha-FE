import useCountdownTimer from '@/hooks/useCountdownTimer';
import { Dispatch, SetStateAction, useEffect } from 'react';
import * as S from './AuctionCountdown.css';

interface AuctionCountdownProps {
  endTime: Date | string;
  setExpired: Dispatch<SetStateAction<boolean>>;
}

function AuctionCountdown({ endTime, setExpired }: AuctionCountdownProps) {
  const { isTimeout, day, hour, minute, second } = useCountdownTimer({ endTime });

  useEffect(() => {
    if (isTimeout) {
      setExpired(true);
    }
  }, [isTimeout]);

  return <div className={S.countdownStyle}>{`${day}일 ${hour}시간 ${minute}분 ${second}초`}</div>;
}

export default AuctionCountdown;
