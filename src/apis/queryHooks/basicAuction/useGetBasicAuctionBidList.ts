import { useQuery } from '@tanstack/react-query';

import { getBasicAuctionBidList } from '@/apis/queryFunctions/basicAuction';

function useGetBasicAuctionBidList(id: number) {
  const { data } = useQuery({
    queryKey: ['basicAuctionBidList', id],
    queryFn: () => getBasicAuctionBidList(id),
    staleTime: 0,
  });
  return { data };
}

export default useGetBasicAuctionBidList;
