import { QueryClient, QueryKey } from '@tanstack/react-query';

import createFetchApiClient from '@/apis/queryFunctions/featchApiClient';
import { Response } from '@/apis/types/common';

interface UsePrefetchQueriesWithCookieProps<T, TQueryKey extends QueryKey> {
  queryKey: TQueryKey;
  api: string;
  initialData?: T;
}

async function usePrefetchQueriesWithCookie<T, TQueryKey extends QueryKey>(
  queries: UsePrefetchQueriesWithCookieProps<T, TQueryKey>[],
) {
  const queryClient = new QueryClient();

  await Promise.all(
    queries.map(async ({ queryKey, api }) => {
      await queryClient.prefetchQuery({
        queryKey,
        queryFn: async () => {
          try {
            const response = await createFetchApiClient<Response<T>>({
              endpoint: api,
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
    }),
  );

  return queryClient;
}

export default usePrefetchQueriesWithCookie;
