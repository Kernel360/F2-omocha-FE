import { useQuery } from '@tanstack/react-query';

import { getBidAuctionHistoriesUnit } from '@/apis/queryFunctions/User';
import { useCookies } from '@/provider/cookiesProvider';

function useGetBidAuctionHistoriesUnit(auctionId: number | null) {
  const { clientToken } = useCookies();

  const { data } = useQuery({
    queryKey: ['bidAuctionHistories', auctionId],
    queryFn: () => getBidAuctionHistoriesUnit(auctionId, clientToken),
    enabled: !!auctionId,
  });

  return { data: data?.result_data };
}

export default useGetBidAuctionHistoriesUnit;
