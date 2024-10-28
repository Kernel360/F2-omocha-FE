import { useCallback } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function useSetSearchParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setSingleSearchParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      params.set(key, value);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  const setMultipleSearchParams = useCallback(
    (params: Record<string, string>) => {
      const searchParamsObj = new URLSearchParams(searchParams.toString());

      Object.entries(params).forEach(([key, val]) => {
        searchParamsObj.set(key, val);
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
