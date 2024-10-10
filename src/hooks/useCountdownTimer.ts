'use client';

import calcRemainingTime from '@/utils/calcRemainingTime';
import { useEffect, useState } from 'react';

interface UseCountdownTimerProps {
  endTime: Date | string;
}

const MINUTE_IN_MILLIS = 1000 * 60;
const HOUR_IN_MILLIS = MINUTE_IN_MILLIS * 60;
const DAY_IN_MILLIS = HOUR_IN_MILLIS * 24;

function useCountdownTimer({ endTime }: UseCountdownTimerProps) {
  const [remainingTime, setRemainingTime] = useState<number>(0);

  useEffect(() => {
    setRemainingTime(calcRemainingTime(new Date(endTime)));
    const intervalID = setInterval(() => {
      const remainingTimeInUseEffect = calcRemainingTime(new Date(endTime));

      if (remainingTimeInUseEffect <= 0) {
        clearInterval(intervalID);
        setRemainingTime(0);

        return;
      }
      setRemainingTime(remainingTimeInUseEffect);
    }, 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, []);

  const day = Math.floor(remainingTime / DAY_IN_MILLIS) || '-';
  const hour = Math.floor((remainingTime % DAY_IN_MILLIS) / HOUR_IN_MILLIS) || '-';
  const minute = Math.floor((remainingTime % HOUR_IN_MILLIS) / MINUTE_IN_MILLIS) || '-';
  const second = Math.floor((remainingTime % MINUTE_IN_MILLIS) / 1000) || '-';
  const isTimeout = remainingTime <= 0;

  return { isTimeout, remainingTime, day, hour, minute, second };
}

export default useCountdownTimer;
