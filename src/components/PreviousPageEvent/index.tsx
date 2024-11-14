'use client';

import { useEffect } from 'react';

import { usePathname, useSearchParams } from 'next/navigation';

function PreviousPageEvent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const storage = sessionStorage;
    const currentUrl = `${pathname}?${searchParams}`;
    const previousUrl = storage.getItem('CURRENT_URL');

    if (previousUrl) {
      storage.setItem('PREVIOUS_URL', previousUrl);
    }

    storage.setItem('CURRENT_URL', currentUrl);
  }, [pathname, searchParams]);

  return null;
}

export default PreviousPageEvent;
