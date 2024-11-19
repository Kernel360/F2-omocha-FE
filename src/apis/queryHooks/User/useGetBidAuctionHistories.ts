import { useQuery } from '@tanstack/react-query';

import { getBidAuctionHistories } from '@/apis/queryFunctions/User';

function useGetBidAuctionHistories() {
  const { data } = useQuery({
    queryKey: ['bidAuctionHistories'],
    queryFn: () => getBidAuctionHistories(),
  });

  return { data: data?.result_data };
}

export default useGetBidAuctionHistories;
