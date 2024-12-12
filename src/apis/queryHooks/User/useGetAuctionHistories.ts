import { useQuery } from '@tanstack/react-query';

import { getAuctionHistories } from '@/apis/queryFunctions/User';
import getAuthTokens from '@/utils/getAuthTokens';

function useGetAuctionHistories() {
  const tokens = getAuthTokens();

  const { data } = useQuery({
    queryKey: ['getAuctionHistories'],
    queryFn: () => getAuctionHistories(tokens),
  });

  return { data: data?.result_data };
}

export default useGetAuctionHistories;
