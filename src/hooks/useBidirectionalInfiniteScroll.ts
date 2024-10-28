import { useEffect, useRef } from 'react';

interface UseBidirectionalInfiniteScrollParams {
  sectionRef: React.RefObject<HTMLDivElement>;
  upFetch?: () => void;
  downFetch?: () => void;
}

function useBidirectionalInfiniteScroll({
  sectionRef,
  upFetch,
  downFetch,
}: UseBidirectionalInfiniteScrollParams) {
  const prevScrollHeightRef = useRef(0);

  useEffect(() => {
    if (!sectionRef.current) return undefined;

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = sectionRef.current;
      if (scrollTop === 0) {
        prevScrollHeightRef.current = scrollHeight;
        if (upFetch) upFetch();
      }

      if (scrollTop + clientHeight === scrollHeight) {
        if (downFetch) downFetch();
      }
    };

    const currentSection = sectionRef.current;
    currentSection.addEventListener('scroll', handleScroll);

    return () => {
      currentSection.removeEventListener('scroll', handleScroll);
    };
  }, [sectionRef, upFetch, downFetch]);

  useEffect(() => {
    if (sectionRef.current && prevScrollHeightRef.current) {
      const newScrollHeight = sectionRef.current.scrollHeight;
      const currentSection = sectionRef.current;
      currentSection.scrollTop += newScrollHeight - prevScrollHeightRef.current;

      prevScrollHeightRef.current = 0;
    }
  }, [sectionRef, upFetch]);

  return { sectionRef };
}

export default useBidirectionalInfiniteScroll;
