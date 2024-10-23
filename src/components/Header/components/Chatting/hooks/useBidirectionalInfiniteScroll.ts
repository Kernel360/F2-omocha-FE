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
  const handleScroll = () => {
    if (!sectionRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = sectionRef.current;
    // console.log('scrollTop', scrollTop);
    // console.log('scrollHeight', scrollHeight);
    // console.log('clientHeight', clientHeight);

    if (scrollTop === 0) {
      console.log('upFetch');
      upFetch();
    }

    if (scrollTop + clientHeight === scrollHeight) {
      console.log('downFetch', downFetch);
      // downFetch();
    }
  };

  useEffect(() => {
    if (!sectionRef.current) return undefined;

    const currentSection = sectionRef.current;
    currentSection.addEventListener('scroll', handleScroll);

    return () => {
      currentSection.removeEventListener('scroll', handleScroll);
    };
  }, [sectionRef]);

  return { sectionRef };
}

export default useBidirectionalInfiniteScroll;
