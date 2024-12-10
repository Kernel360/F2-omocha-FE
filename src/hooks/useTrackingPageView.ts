import { useEffect, useRef } from 'react';

import mixpanel from '@/lib/mixpanel';

interface UseTrackingPageViewProps {
  threshold?: number;
  pageViewEventName: string;
}

function useTrackingPageView({ threshold = 0.1, pageViewEventName }: UseTrackingPageViewProps) {
  const pageRef = useRef(null);
  const hasTracked = useRef(false); // 이벤트 발생 여부 관리

  useEffect(() => {
    if (!pageRef) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasTracked.current) {
            mixpanel.track(pageViewEventName);
            hasTracked.current = true; // 이벤트 발생 후 플래그 설정
          }
        });
      },
      { threshold },
    );

    if (pageRef.current) observer.observe(pageRef.current);

    // eslint-disable-next-line consistent-return
    return () => observer.disconnect();
  }, [pageViewEventName, threshold]);

  return { pageRef };
}

export default useTrackingPageView;
