import { useQuery } from '@tanstack/react-query';

import { getBidAuctionHistories } from '@/apis/queryFunctions/User';
import { useCookies } from '@/provider/cookiesProvider';

function useGetBidAuctionHistories() {
  const { clientToken } = useCookies();

  const { data } = useQuery({
    queryKey: ['bidAuctionHistories'],
    queryFn: () => getBidAuctionHistories(clientToken),
  });

  return { data: data?.result_data };
}

export default useGetBidAuctionHistories;
