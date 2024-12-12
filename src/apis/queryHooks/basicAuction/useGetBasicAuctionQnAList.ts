import { useQuery } from '@tanstack/react-query';

import { getAuctionQnAList } from '@/apis/queryFunctions/basicAuction';
import { useCookies } from '@/provider/cookiesProvider';

function useGetAuctionQnAList(id: number) {
  const { clientToken } = useCookies();
  const { data } = useQuery({
    queryFn: () => getAuctionQnAList(id, clientToken),
    queryKey: ['auctionQnAList', id],
  });
  return { data };
}

export default useGetAuctionQnAList;
