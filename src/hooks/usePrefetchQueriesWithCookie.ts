import { QueryClient, QueryKey } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import createFetchApiClient from '@/apis/queryFunctions/featchApiClient';
import { Response } from '@/apis/types/common';
// import { useCookies } from '@/provider/cookiesProvider';

interface UsePrefetchQueriesWithCookieProps<T, TQueryKey extends QueryKey> {
  queryKey: TQueryKey;
  api: string;
  initialData?: T;
}

async function usePrefetchQueriesWithCookie<T, TQueryKey extends QueryKey>(
  queries: UsePrefetchQueriesWithCookieProps<T, TQueryKey>[],
) {
  const queryClient = new QueryClient();
  // const { clientToken } = useCookies();

  await Promise.all(
    queries.map(async ({ queryKey, api }) => {
      await queryClient.prefetchQuery({
        queryKey,
        queryFn: async () => {
          try {
            const response = await createFetchApiClient<Response<T>>({
              endpoint: api,
              // authorizationToken: clientToken,
            });

            return response;
          } catch (e) {
            if (e instanceof AxiosError) {
              console.log(queryKey, '->', e.response?.data);
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
