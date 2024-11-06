'use client';

import { PropsWithChildren, useEffect, useState } from 'react';

// 특정 시간이 지난 후에 children을 렌더링하는 컴포넌트
function DeferredComponent({ children }: PropsWithChildren) {
  const [isDeferred, setIsDeferred] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsDeferred(true);
    }, 200);
    return () => clearTimeout(timeoutId);
  }, []);

  if (!isDeferred) {
    return null;
  }

  return children;
}

export default DeferredComponent;
