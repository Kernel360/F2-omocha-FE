import { useEffect, useState } from 'react';

interface useCountdownTimerProps {
  endTime: Date | string;
}

const MINUTE_IN_MILLIS = 1000 * 60;
const HOUR_IN_MILLIS = MINUTE_IN_MILLIS * 60;
const DAY_IN_MILLIS = HOUR_IN_MILLIS * 24;

function useCountdownTimer({ endTime }: useCountdownTimerProps) {
  const countRemainingTime = (endTime: Date) => {
    const nowTime = new Date();
    if (endTime.getTime() < nowTime.getTime()) {
      return 0;
    }

    return endTime.getTime() - nowTime.getTime();
  };

  const [remainingTime, setRemainingTime] = useState<number>(() =>
    countRemainingTime(new Date(endTime)),
  );

  useEffect(() => {
    const intervalID = setInterval(() => {
      const remainingTime = countRemainingTime(new Date(endTime));
      const isTimeout = remainingTime <= 0;
      if (isTimeout) {
        clearInterval(intervalID);
        setRemainingTime(0);

        return;
      }
      setRemainingTime(remainingTime);
    }, 1000);

    return () => {
      clearInterval(intervalID);
    };
  });

  const day = Math.floor(remainingTime / DAY_IN_MILLIS);
  const hour = Math.floor((remainingTime % DAY_IN_MILLIS) / HOUR_IN_MILLIS);
  const minute = Math.floor((remainingTime % HOUR_IN_MILLIS) / MINUTE_IN_MILLIS);
  const second = Math.floor((remainingTime % MINUTE_IN_MILLIS) / 1000);
  const isTimeout = remainingTime <= 0;

  return { isTimeout, remainingTime, day, hour, minute, second };
}

export default useCountdownTimer;
