import { useQuery } from '@tanstack/react-query';

import { getBasicAuctionQueryFn } from '@/apis/queryFunctions/basicAuctionQueryFn';

function useGetBasicAuction(id: number) {
  const { data } = useQuery({
    queryKey: ['basicAuction', id],
    queryFn: () => getBasicAuctionQueryFn(id),
  });
  return { data };
}

export default useGetBasicAuction;
