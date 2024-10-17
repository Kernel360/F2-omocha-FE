import { useQuery } from '@tanstack/react-query';

import { getNowPrice } from '@/apis/queryFunctions/basicAuction';

function useGetBasicAuctionNowPrice(id: number) {
  const { data, error, refetch } = useQuery({
    queryKey: ['nowPrice'],
    queryFn: () => getNowPrice(id),
  });

  return { data, error, refetch };
}

export default useGetBasicAuctionNowPrice;
