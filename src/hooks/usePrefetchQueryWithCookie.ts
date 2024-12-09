import { QueryClient, QueryKey } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import createFetchApiClient from '@/apis/queryFunctions/featchApiClient';
import { Response } from '@/apis/types/common';

interface UsePrefetchQueryWithCookieProps<T, TQueryKey extends QueryKey> {
  queryKey: TQueryKey;
  api: string;
  initialData?: T;
}

async function usePrefetchQueryWithCookie<T, TQueryKey extends QueryKey>({
  queryKey,
  api,
}: UsePrefetchQueryWithCookieProps<T, TQueryKey>) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: async () => {
      try {
        const response = await createFetchApiClient<Response<T>>(api);
        return response;
      } catch (e) {
        if (e instanceof AxiosError) {
          console.log(queryKey, '->', e.response?.data);
        }
        return null;
      }
    },
  });

  return queryClient;
}

export default usePrefetchQueryWithCookie;
