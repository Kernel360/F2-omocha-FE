import { useEffect } from 'react';

interface UseBidirectionalInfiniteScrollParams {
  sectionRef: React.RefObject<HTMLDivElement>;
  upFetch: () => void;
  downFetch: () => void;
}

function useBidirectionalInfiniteScroll({
  sectionRef,
  upFetch,
  downFetch,
}: UseBidirectionalInfiniteScrollParams) {
  useEffect(() => {
    if (!sectionRef.current) return undefined;

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = sectionRef.current;
      if (scrollTop === 0) {
        console.log('upFetch');
        upFetch();
      }

      if (scrollTop + clientHeight === scrollHeight) {
        console.log('downFetch', downFetch);
      }
    };

    const currentSection = sectionRef.current;
    currentSection.addEventListener('scroll', handleScroll);

    return () => {
      currentSection.removeEventListener('scroll', handleScroll);
    };
  }, [sectionRef, upFetch, downFetch]);

  return { sectionRef };
}

export default useBidirectionalInfiniteScroll;
