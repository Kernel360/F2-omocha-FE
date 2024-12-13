import { useQuery } from '@tanstack/react-query';

import { getBidAuctionHistoriesUnit } from '@/apis/queryFunctions/User';
import getAuthTokens from '@/utils/getAuthTokens';

function useGetBidAuctionHistoriesUnit(auctionId: number | null) {
  const tokens = getAuthTokens();

  const { data } = useQuery({
    queryKey: ['bidAuctionHistories', auctionId],
    queryFn: () => getBidAuctionHistoriesUnit(auctionId, tokens),
    enabled: !!auctionId,
  });

  return { data: data?.result_data };
}

export default useGetBidAuctionHistoriesUnit;
