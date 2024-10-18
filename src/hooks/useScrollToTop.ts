'use client';

import { useEffect } from 'react';

function useScrollToTop() {
  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);
}

export default useScrollToTop;
