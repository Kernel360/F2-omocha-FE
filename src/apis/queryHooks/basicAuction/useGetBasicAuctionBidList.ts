import { useQuery } from '@tanstack/react-query';

import { getBasicAuctionBidList } from '@/apis/queryFunctions/basicAuction';
// import { useCookies } from '@/provider/cookiesProvider';
import getAuthTokens from '@/utils/getAuthTokens';

function useGetBasicAuctionBidList(id: number) {
  // const { clientToken } = useCookies();
  const tokens = getAuthTokens();

  const { data } = useQuery({
    queryKey: ['basicAuctionBidList', id],
    queryFn: () => getBasicAuctionBidList(id, tokens),
    staleTime: 0,
  });
  return { data };
}

export default useGetBasicAuctionBidList;
