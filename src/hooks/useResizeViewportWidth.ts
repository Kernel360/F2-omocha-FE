'use client';

import { useEffect, useState } from 'react';

function useResizeViewportWidth() {
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    const resizeViewportWidth = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener('resize', resizeViewportWidth);

    return () => {
      window.removeEventListener('resize', resizeViewportWidth);
    };
  }, []);

  return { viewportWidth };
}

export default useResizeViewportWidth;
