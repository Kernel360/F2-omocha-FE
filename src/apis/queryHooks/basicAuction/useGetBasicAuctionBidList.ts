import { useQuery } from '@tanstack/react-query';

import { getBasicAuctionBidList } from '@/apis/queryFunctions/basicAuction';

function useGetBasicAuctionBidList(id: number) {
  const { data } = useQuery({
    queryKey: ['basicAuctionBidList', id],
    queryFn: () => getBasicAuctionBidList(id),
  });
  return { data };
}

export default useGetBasicAuctionBidList;
