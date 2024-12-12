import { useQuery } from '@tanstack/react-query';

import { getNowPrice } from '@/apis/queryFunctions/basicAuction';

function useGetBasicAuctionNowPrice(id: number) {
  const { data, error, refetch } = useQuery({
    queryKey: ['nowPrice', id],
    queryFn: () => getNowPrice(id),
    staleTime: 0,
  });

  return { data, error, refetch };
}

export default useGetBasicAuctionNowPrice;
