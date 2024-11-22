'use client';

import { useEffect, useRef } from 'react';

import { usePathname, useSearchParams } from 'next/navigation';

export default function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const scrollPageMapRef = useRef<Record<string, number>>({});

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;

    window.scrollTo({ top: scrollPageMapRef.current[url] });

    const scrollHandler = () => {
      scrollPageMapRef.current[url] = window.scrollY;
    };

    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [pathname, searchParams]);

  return null;
}
