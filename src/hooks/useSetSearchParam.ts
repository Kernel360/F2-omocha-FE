import { useCallback } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function useSetSearchParam() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setSearchParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, value);

      router.replace(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams],
  );
  return [searchParams, setSearchParam] as const;
}

export default useSetSearchParam;
