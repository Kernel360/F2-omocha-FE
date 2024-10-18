import { useQuery } from '@tanstack/react-query';

import { getBasicAuction } from '@/apis/queryFunctions/basicAuction';

function useGetBasicAuction(id: number) {
  const { data, refetch } = useQuery({
    queryKey: ['basicAuction', id],
    queryFn: () => getBasicAuction(id),
  });
  return { data, refetch };
}

export default useGetBasicAuction;
