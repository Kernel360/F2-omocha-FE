import { useQuery } from '@tanstack/react-query';

import { getAuctionHistories } from '@/apis/queryFunctions/User';
// import { useCookies } from '@/provider/cookiesProvider';
import getAuthTokens from '@/utils/getAuthTokens';

function useGetAuctionHistories() {
  // const { clientToken } = useCookies();

  const tokens = getAuthTokens();

  const { data } = useQuery({
    queryKey: ['getAuctionHistories'],
    queryFn: () => getAuctionHistories(tokens),
  });

  return { data: data?.result_data };
}

export default useGetAuctionHistories;
