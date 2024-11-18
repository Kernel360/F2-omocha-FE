import { useCallback, useEffect, useRef } from 'react';

import { InfiniteQueryObserverResult } from '@tanstack/react-query';

interface UseIntersectionObserverProps {
  threshold?: number;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>;
}

export const useIntersectionObserver = ({
  threshold = 0.1,
  hasNextPage,
  fetchNextPage,
}: UseIntersectionObserverProps) => {
  const endCursorRef = useRef(null);

  const getNextData = useCallback<IntersectionObserverCallback>(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
    },
    [hasNextPage, fetchNextPage],
  );

  useEffect(() => {
    if (!endCursorRef) return;

    const observer = new IntersectionObserver(getNextData, {
      threshold,
    });
    if (endCursorRef.current) observer.observe(endCursorRef.current);

    // eslint-disable-next-line consistent-return
    return () => observer.disconnect();
  }, [endCursorRef, getNextData, threshold]);

  console.log('endCursorRef', endCursorRef);

  return { endCursorRef };
};
