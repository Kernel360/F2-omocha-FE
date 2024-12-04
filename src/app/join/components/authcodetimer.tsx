import { useEffect } from 'react';

import { AsteriskIcon } from 'lucide-react';

import * as S from '../Join.css';

interface AuthCodeTimerProps {
  count: number;
  setCount: (count: number) => void;
}

function AuthCodeTimer({ count, setCount }: AuthCodeTimerProps) {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count - 1);
    }, 1000);

    if (count === 0) {
      clearInterval(id);
    }
    return () => {
      clearInterval(id);
    };
  });

  return (
    <div className={S.timer}>
      <AsteriskIcon size={12} /> {formatTime(count)}
    </div>
  );
}

export default AuthCodeTimer;
