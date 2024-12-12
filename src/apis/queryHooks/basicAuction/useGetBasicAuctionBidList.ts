import { useQuery } from '@tanstack/react-query';

import { getBasicAuctionBidList } from '@/apis/queryFunctions/basicAuction';
import getAuthTokens from '@/utils/getAuthTokens';

function useGetBasicAuctionBidList(id: number) {
  const tokens = getAuthTokens();

  const { data } = useQuery({
    queryKey: ['basicAuctionBidList', id],
    queryFn: () => getBasicAuctionBidList(id, tokens),
    staleTime: 0,
  });
  return { data };
}

export default useGetBasicAuctionBidList;
