import { QueryClient, QueryKey } from '@tanstack/react-query';

import createFetchApiClient from '@/apis/queryFunctions/featchApiClient';
import { Response } from '@/apis/types/common';

interface UsePrefetchQueryWithCookieProps<T, TQueryKey extends QueryKey> {
  queryKey: TQueryKey;
  api: string;
  initialData?: T;
  authorizationToken: {
    accessToken: string | undefined;
    refreshToken: string | undefined;
  };
}

async function usePrefetchQueryWithCookie<T, TQueryKey extends QueryKey>({
  queryKey,
  api,
  authorizationToken,
}: UsePrefetchQueryWithCookieProps<T, TQueryKey>) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: async () => {
      try {
        const response = await createFetchApiClient<Response<T>>({
          endpoint: api,
          authorizationToken,
        });
        return response;
      } catch (e) {
        if (e) {
          console.log(queryKey, '->', e);
        }
        return null;
      }
    },
  });

  return queryClient;
}

export default usePrefetchQueryWithCookie;
