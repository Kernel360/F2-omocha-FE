import { useQuery } from '@tanstack/react-query';

import { getBidAuctionHistories } from '@/apis/queryFunctions/User';
import { bidAuctionHistories } from '@/mocks/data/bidAuctionHistories';

function useGetBidAuctionHistories() {
  return { data: bidAuctionHistories };
  const { data } = useQuery({
    queryKey: ['bidAuctionHistories'],
    queryFn: () => getBidAuctionHistories(),
  });

  return { data };
}

export default useGetBidAuctionHistories;
