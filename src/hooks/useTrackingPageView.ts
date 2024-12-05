import { useEffect, useRef } from 'react';

import mixpanel from '@/lib/mixpanel';

interface UseTrackingPageViewProps {
  threshold?: number;
  pageViewEventName: string;
}

function useTrackingPageView({ threshold = 0.1, pageViewEventName }: UseTrackingPageViewProps) {
  const pageRef = useRef(null);

  useEffect(() => {
    if (!pageRef) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            mixpanel.track(pageViewEventName);
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
