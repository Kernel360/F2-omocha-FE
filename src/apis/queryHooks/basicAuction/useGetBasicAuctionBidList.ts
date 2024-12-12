import { useQuery } from '@tanstack/react-query';

import { getBasicAuctionBidList } from '@/apis/queryFunctions/basicAuction';
import { useCookies } from '@/provider/cookiesProvider';

function useGetBasicAuctionBidList(id: number) {
  const { clientToken } = useCookies();
  const { data } = useQuery({
    queryKey: ['basicAuctionBidList', id],
    queryFn: () => getBasicAuctionBidList(id, clientToken),
    staleTime: 0,
  });
  return { data };
}

export default useGetBasicAuctionBidList;
