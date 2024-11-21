import { useCallback } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function useSetSearchParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setSingleSearchParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  const setMultipleSearchParams = useCallback(
    (params: Record<string, string>) => {
      const searchParamsObj = new URLSearchParams(searchParams.toString());

      Object.entries(params).forEach(([key, value]) => {
        if (value === '') {
          searchParamsObj.delete(key);
        } else {
          searchParamsObj.set(key, value);
        }
      });

      router.replace(`${pathname}?${searchParamsObj.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  return {
    setSingleSearchParam,
    setMultipleSearchParams,
    searchParams,
  };
}

export default useSetSearchParams;
