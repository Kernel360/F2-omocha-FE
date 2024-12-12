import { useQuery } from '@tanstack/react-query';

import { getBidAuctionHistories } from '@/apis/queryFunctions/User';

function useGetBidAuctionHistories() {
  const { data, isLoading } = useQuery({
    queryKey: ['bidAuctionHistories'],
    queryFn: () => getBidAuctionHistories(),
  });

  return { data: data?.result_data, isLoading };
}

export default useGetBidAuctionHistories;
