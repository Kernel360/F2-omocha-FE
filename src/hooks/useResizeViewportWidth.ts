'use client';

import { useEffect, useState } from 'react';

function useResizeViewportWidth() {
  const [viewportWidth, setViewportWidth] = useState<number | null>(null);

  useEffect(() => {
    const resizeViewportWidth = () => {
      setViewportWidth(window.innerWidth);
    };

    resizeViewportWidth();

    window.addEventListener('resize', resizeViewportWidth);

    return () => {
      window.removeEventListener('resize', resizeViewportWidth);
    };
  }, []);

  return { viewportWidth };
}

export default useResizeViewportWidth;
