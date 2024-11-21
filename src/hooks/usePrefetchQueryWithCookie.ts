import { QueryClient, QueryKey } from '@tanstack/react-query';
import { cookies } from 'next/headers';

import createApiClient from '@/apis/queryFunctions/apiClient';
import { Response } from '@/apis/types/common';

interface UsePrefetchQueryProps<T, TQueryKey extends QueryKey> {
  queryKey: TQueryKey;
  api: string;
  initialData?: T;
}

async function usePrefetchQueryWithCookie<T, TQueryKey extends QueryKey>({
  queryKey,
  api,
}: UsePrefetchQueryProps<T, TQueryKey>) {
  const cookie = cookies();
  const apiClient = createApiClient(cookie.toString());
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: async () => {
      try {
        const response = await apiClient.get<Response<T>>(api);
        return response.data;
      } catch (e) {
        return null;
      }
    },
  });

  return queryClient;
}

export default usePrefetchQueryWithCookie;
