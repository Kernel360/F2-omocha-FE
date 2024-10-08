import { useQuery } from '@tanstack/react-query';

import { getBasicAuction } from '@/apis/queryFunctions/basicAuction';

function useGetBasicAuction(id: number) {
  const { data } = useQuery({
    queryKey: ['basicAuction', id],
    queryFn: () => getBasicAuction(id),
  });
  return { data };
}

export default useGetBasicAuction;
