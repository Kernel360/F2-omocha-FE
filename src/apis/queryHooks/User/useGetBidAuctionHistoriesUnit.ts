import { useQuery } from '@tanstack/react-query';

import { getBidAuctionHistoriesUnit } from '@/apis/queryFunctions/User';

function useGetBidAuctionHistoriesUnit(auctionId: number | null) {
  const { data } = useQuery({
    queryKey: ['bidAuctionHistories', auctionId],
    queryFn: () => getBidAuctionHistoriesUnit(auctionId),
    enabled: !!auctionId,
  });

  return { data: data?.result_data };
}

export default useGetBidAuctionHistoriesUnit;
