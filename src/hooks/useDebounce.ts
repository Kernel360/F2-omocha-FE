import { useCallback, useEffect, useRef } from 'react';

function useDebounce<T extends unknown[]>(func: (...args: T) => void | Promise<void>, wait = 1000) {
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const debouncedFn = useCallback(
    (...args: T) => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }

      timeout.current = setTimeout(() => {
        func(...args);
      }, wait);
    },
    [wait],
  );

  // 컴포넌트 엄마운트 타이머 해제
  useEffect(() => {
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, []);

  return debouncedFn;
}

export default useDebounce;
