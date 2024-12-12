import { useQuery } from '@tanstack/react-query';

import { getBidAuctionHistories } from '@/apis/queryFunctions/User';
import getAuthTokens from '@/utils/getAuthTokens';

function useGetBidAuctionHistories() {
  const tokens = getAuthTokens();

  const { data, isLoading } = useQuery({
    queryKey: ['bidAuctionHistories'],
    queryFn: () => getBidAuctionHistories(tokens),
  });

  return { data: data?.result_data, isLoading };
}

export default useGetBidAuctionHistories;
