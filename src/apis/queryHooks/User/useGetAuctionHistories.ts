import { useQuery } from '@tanstack/react-query';

import { getAuctionHistories } from '@/apis/queryFunctions/User';

function useGetAuctionHistories() {
  const { data } = useQuery({
    queryKey: ['getAuctionHistories'],
    queryFn: () => getAuctionHistories(),
  });

  return { data: data?.result_data };
}

export default useGetAuctionHistories;
