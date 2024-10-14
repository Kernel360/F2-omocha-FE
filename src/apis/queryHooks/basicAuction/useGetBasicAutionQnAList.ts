import { useQuery } from '@tanstack/react-query';

import { getAuctionQnAList } from '@/apis/queryFunctions/basicAuction';

function useGetAuctionQNAList(id: number) {
  const { data } = useQuery({
    queryKey: ['auctionQnAList', id],
    queryFn: () => getAuctionQnAList(id),
  });
  return { data };
}

export default useGetAuctionQNAList;
