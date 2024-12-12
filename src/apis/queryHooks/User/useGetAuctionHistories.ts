import { useQuery } from '@tanstack/react-query';

import { getAuctionHistories } from '@/apis/queryFunctions/User';
import { useCookies } from '@/provider/cookiesProvider';

function useGetAuctionHistories() {
  const { clientToken } = useCookies();

  const { data } = useQuery({
    queryKey: ['getAuctionHistories'],
    queryFn: () => getAuctionHistories(clientToken),
  });

  return { data: data?.result_data };
}

export default useGetAuctionHistories;
