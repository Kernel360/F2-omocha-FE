import { useQuery } from '@tanstack/react-query';

import { getBasicAuctionBidList } from '@/apis/queryFunctions/basicAuction';

function useGetBasicAuctionBidList(id: number) {
  return useQuery({
    queryKey: ['basicAuctionBidList', id],
    queryFn: () => getBasicAuctionBidList(id),
  });
}

export default useGetBasicAuctionBidList;
