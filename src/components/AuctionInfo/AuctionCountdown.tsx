import useCountdownTimer from '@/hooks/useCountdownTimer';
import { Dispatch, SetStateAction, useEffect } from 'react';

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

  return (
    <>
      <div>{`${day}일 ${hour}H ${minute}M ${second}S`}</div>
    </>
  );
}

export default AuctionCountdown;
