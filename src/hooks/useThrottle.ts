import { useEffect, useRef } from 'react';

function useThrottle<T extends unknown[]>(callback: (...params: T) => void, time = 1000) {
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const nextArgs = useRef<T>(); // 다음으로 실행할 값

  const throttledFn = (...args: T) => {
    if (!timeout.current) {
      callback(...args); // 타이머 없으면 즉시 실행

      const timeoutCallback = () => {
        if (nextArgs.current) {
          callback(...nextArgs.current); // 다음 인수로 콜백 재실행
          nextArgs.current = undefined;

          timeout.current = setTimeout(timeoutCallback, time); // 타이머 재실행
          return;
        }
        timeout.current = undefined; // 타이머 종료
      };

      timeout.current = setTimeout(timeoutCallback, time);
      return;
    }

    nextArgs.current = args; // 타이머가 있는 경우, 다음 호출 인수를 저장
  };

  // 컴포넌트 엄마운트 타이머 해제
  useEffect(() => {
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, []);

  return throttledFn;
}

export default useThrottle;
