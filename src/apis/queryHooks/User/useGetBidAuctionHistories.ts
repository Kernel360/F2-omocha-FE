import { useQuery } from '@tanstack/react-query';

import { getBidAuctionHistories } from '@/apis/queryFunctions/User';
// import { useCookies } from '@/provider/cookiesProvider';
import getAuthTokens from '@/utils/getAuthTokens';

function useGetBidAuctionHistories() {
  // const { clientToken } =
  const tokens = getAuthTokens();

  const { data } = useQuery({
    queryKey: ['bidAuctionHistories'],
    queryFn: () => getBidAuctionHistories(tokens),
  });

  return { data: data?.result_data };
}

export default useGetBidAuctionHistories;
