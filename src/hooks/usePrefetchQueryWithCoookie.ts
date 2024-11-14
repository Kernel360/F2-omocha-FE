import { QueryClient, QueryKey } from '@tanstack/react-query';
import axios from 'axios';
import { cookies } from 'next/headers';

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
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: async () => {
      try {
        const response = await axios.get<Response<T>>(
          `${process.env.NEXT_PUBLIC_SERVER_API_URL}/api${api}`,
          {
            headers: {
              Cookie: cookie.toString(),
            },
            withCredentials: true,
          },
        );

        return response.data;
      } catch (e) {
        console.log(e);
        return null;
      }
    },
  });

  return queryClient;
}

export default usePrefetchQueryWithCookie;
