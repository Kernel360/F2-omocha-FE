import { useQuery } from '@tanstack/react-query';

import { getAuctionQnAList } from '@/apis/queryFunctions/basicAuction';
import getAuthTokens from '@/utils/getAuthTokens';

function useGetAuctionQnAList(id: number) {
  const tokens = getAuthTokens();

  const { data } = useQuery({
    queryFn: () => getAuctionQnAList(id, tokens),
    queryKey: ['auctionQnAList', id],
  });
  return { data };
}

export default useGetAuctionQnAList;
